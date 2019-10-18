const {
    createRequestToFile,
    findRequests,
    updateRequest,
    getRequest,
    getRequestMatch,
    findRequestsTotalMatch,
    findRequestsMatchWithoutYearPlanOrigin,
    findRequestsMatch,
    findRequestsStepper,
    findRequestsStepperProfessor,
    updateRequestsWithoutEvaluating,
    updateRequestProfessor,
    findAllRequestsProfessor
  } = require('../interactors/request'),
  { findFile, createFile, updateFile, decrementFileStatus } = require('../interactors/file'),
  { mapExistingFile, mapNewFile, mapUpdateFile, getStatus } = require('../mappers/file'),
  { mapSetRequests } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { ADMIN, PROFESSOR } = require('../constants/user'),
  { differenceBy } = require('lodash'),
  logger = require('../logger');

const createRequestsToFile = (fileSaved, newFile) =>
  createRequestToFile(mapExistingFile(fileSaved.id, newFile))
    .then(() =>
      updateRequestsWithoutEvaluating(fileSaved.id, newFile.requests.map(({ subjectUnq }) => subjectUnq))
    )
    .then(() =>
      updateFile(
        mapUpdateFile({
          status: getStatus(fileSaved.requests, newFile.requests)
        }),
        fileSaved.id
      )
    );

exports.addRequest = (req, res, next) =>
  findFile(req.body.fileNumber)
    .then(file => {
      logger.info(`File ${file ? 'already' : 'does not'} exists`);
      return file ? createRequestsToFile(file.dataValues, req.body) : createFile(mapNewFile(req.body));
    })
    .then(() => res.status(200).send('Request created successfully'))
    .catch(next);

const findRequestsByFileId = ({ id, rol }, fileId) =>
  rol === PROFESSOR ? findAllRequestsProfessor(id, fileId) : findRequests(fileId);

exports.getRequestsByFileId = (req, res, next) =>
  findRequestsByFileId(res.locals.user, req.params.fileId)
    .then(requests => res.status(200).send(requests))
    .catch(next);

const updateRequests = ({ request, user }, body) =>
  user.id === request.professorId && user.role !== ADMIN
    ? updateRequestProfessor(request, body)
    : updateRequest(request, body, user.name).then(() =>
        equivalencesFinished.includes(body.equivalence)
          ? decrementFileStatus(request.fk_fileid)
          : Promise.resolve()
      );

exports.updateEquivalence = (req, res, next) => {
  if (equivalencesFinished.includes(res.locals.request.equivalence))
    return res.status(200).send('Request already updated');
  return updateRequests(res.locals, req.body)
    .then(() => res.status(200).send('Request updated'))
    .catch(next);
};

exports.getRequest = (req, res, next) =>
  getRequest(req.params.requestId)
    .then(request => res.status(200).send(request))
    .catch(next);

exports.getRequestMatchs = async (req, res, next) => {
  try {
    const { dataValues: request } = await getRequest(req.params.requestId);
    if (request.professorEquivalence)
      return res.status(200).send({
        requestsTotalMatchApproved: [],
        requestsMatchWithoutYearPlanApproved: [],
        subjectsToApprove: [],
        requestsMatch: []
      });
    const requests = await getRequestMatch(request);
    const requestsTotalMatchApproved = await findRequestsTotalMatch(request);
    const requestsMatchWithoutYearPlanApproved = requestsTotalMatchApproved.length
      ? []
      : await findRequestsMatchWithoutYearPlanOrigin(request);
    const requestsMatch =
      requestsTotalMatchApproved.length || requestsMatchWithoutYearPlanApproved.length
        ? []
        : await findRequestsMatch(request);
    const getSubjectsOrigin = someRequests =>
      differenceBy(someRequests, requests, 'subjectOrigin').map(({ subjectOrigin }) => subjectOrigin);
    return res.status(200).send({
      requestsTotalMatchApproved,
      requestsMatchWithoutYearPlanApproved,
      subjectsToApprove: requestsTotalMatchApproved.length
        ? getSubjectsOrigin(requestsTotalMatchApproved)
        : requestsMatchWithoutYearPlanApproved.length
        ? getSubjectsOrigin(requestsMatchWithoutYearPlanApproved)
        : [],
      requestsMatch
    });
  } catch (error) {
    return next(error);
  }
};

const getRequestsStepper = ({ id, role }, request) =>
  role === PROFESSOR
    ? findRequestsStepperProfessor(request.fk_fileid, id)
    : findRequestsStepper(request.fk_fileid);

exports.getStepperRequest = (req, res, next) =>
  getRequest(parseInt(req.params.requestId))
    .then(request =>
      getRequestsStepper(res.locals.user, request.dataValues).then(requests =>
        res.status(200).send(mapSetRequests(requests, request.dataValues.subjectUnq))
      )
    )
    .catch(next);
