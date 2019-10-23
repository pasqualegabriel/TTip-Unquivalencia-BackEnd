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
    findAllRequestsProfessor,
    updateConsultEquivalence
  } = require('../interactors/request'),
  { findFile, createFile, updateFile, decrementFileStatus } = require('../interactors/file'),
  { mapExistingFile, mapNewFile, mapUpdateFile, getStatus } = require('../mappers/file'),
  { mapSetRequests } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { PROFESSOR } = require('../constants/user'),
  { differenceBy } = require('lodash'),
  { generateConsultToProfessorMail } = require('../helpers'),
  sendEmail = require('../services/mail'),
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

exports.updateEquivalence = (req, res, next) => {
  if (equivalencesFinished.includes(res.locals.request.equivalence))
    return res.status(200).send('Request already updated');
  return updateRequest(res.locals.request, req.body, res.locals.user.name)
    .then(() =>
      equivalencesFinished.includes(req.body.equivalence)
        ? decrementFileStatus(res.locals.request.fk_fileid)
        : Promise.resolve()
    )
    .then(() => res.status(200).send('Request updated'))
    .catch(next);
};

exports.getRequest = (req, res, next) =>
  getRequest(req.params.requestId)
    .then(request => res.status(200).send(request))
    .catch(next);

const getRequestsStepper = ({ id, role }, request) =>
  role === PROFESSOR
    ? findRequestsStepperProfessor(request.fk_fileid, id)
    : findRequestsStepper(request.fk_fileid);

exports.getRequestMatchs = async (req, res, next) => {
  try {
    const { dataValues: request } = await getRequest(req.params.requestId);
    const requestsStepper = await getRequestsStepper(res.locals.user, request);
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
      ...mapSetRequests(requestsStepper, request),
      match: {
        requestsTotalMatchApproved,
        requestsMatchWithoutYearPlanApproved,
        subjectsToApprove: requestsTotalMatchApproved.length
          ? getSubjectsOrigin(requestsTotalMatchApproved)
          : requestsMatchWithoutYearPlanApproved.length
          ? getSubjectsOrigin(requestsMatchWithoutYearPlanApproved)
          : [],
        requestsMatch
      }
    });
  } catch (error) {
    return next(error);
  }
};

exports.getStepperRequest = (req, res, next) =>
  getRequest(parseInt(req.params.requestId))
    .then(request =>
      getRequestsStepper(res.locals.user, request.dataValues).then(requests =>
        res.status(200).send(mapSetRequests(requests, request.dataValues))
      )
    )
    .catch(next);

exports.consultEquivalence = (req, res, next) =>
  updateConsultEquivalence(res.locals.request, res.locals.professor, req.body)
    .then(() => {
      res.status(200).send('Request updated');
      return sendEmail(generateConsultToProfessorMail(req.params.requestId, res.locals.professor));
    })
    .then(() => {
      logger.info('Email sent to professor');
    })
    .catch(next);
