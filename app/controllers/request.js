const {
    findRequests,
    updateRequest,
    getRequest,
    getRequestMatch,
    findRequestsTotalMatch,
    findRequestsMatchWithoutYearPlanOrigin,
    findRequestsMatch,
    findRequestsStepper,
    findRequestsStepperProfessor,
    findAllRequestsProfessor,
    updateConsultEquivalence,
    findRequestBySubjectUnqId,
    createRequest,
    updateToWithoutEvaluating,
    createRequestSubject,
    getSubjectsStepper
  } = require('../interactors/request'),
  { findFile, createFile, decrementFileStatus } = require('../interactors/file'),
  { mapNewFile } = require('../mappers/file'),
  { mapSetRequests, mapRequestsStepper } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { PROFESSOR } = require('../constants/user'),
  { differenceBy } = require('lodash'),
  { generateConsultToProfessorMail } = require('../helpers'),
  sendEmail = require('../services/mail'),
  logger = require('../logger');

const createAndGetRequest = (file, body) =>
  findRequestBySubjectUnqId(file.id, body.subjectUnqId).then(request =>
    request ? updateToWithoutEvaluating(request) : createRequest(file.id, body.subjectUnqId)
  );

const createRequestsToFile = (file, body) =>
  createAndGetRequest(file, body).then(request =>
    createRequestSubject(
      request.dataValues ? request.dataValues.id : request[1][0].dataValues.id,
      body.subjectOriginId
    )
  );
// .then(() => updateStatus());

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

exports.updateEquivalence = (req, res, next) =>
  updateRequest(req.params.requestId, req.body, res.locals.user.name)
    .then(() =>
      !equivalencesFinished.includes(res.locals.request.equivalence) &&
      equivalencesFinished.includes(req.body.equivalence)
        ? decrementFileStatus(res.locals.request.fk_fileid)
        : Promise.resolve()
    )
    .then(() => res.status(200).send('Request updated'))
    .catch(next);

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
    const sets = await getRequestsStepper(res.locals.user, request);
    const requestsStepper = await getSubjectsStepper(request, req.params.subjectId);
    request.originSubject = request.originSubjects[0].dataValues;
    delete request.originSubjects;
    delete request.originSubject.request_subject;
    // const requests = await getRequestMatch(request);
    const requestsTotalMatchApproved = await findRequestsTotalMatch(request);
    // const requestsMatchWithoutYearPlanApproved = requestsTotalMatchApproved.length
    //   ? []
    //   : await findRequestsMatchWithoutYearPlanOrigin(request);
    // const requestsMatch =
    //   requestsTotalMatchApproved.length || requestsMatchWithoutYearPlanApproved.length
    //     ? []
    //     : await findRequestsMatch(request);
    // const getSubjectsOrigin = someRequests =>
    //   differenceBy(someRequests, requests, 'subjectOrigin').map(({ subjectOrigin }) => subjectOrigin);
    return res.status(200).send({
      request,
      sets,
      requestsStepper: mapRequestsStepper(requestsStepper.dataValues),
      match: { requestsTotalMatchApproved }
      // ...mapSetRequests(requestsStepper, request),
      // match: {
      //   requestsTotalMatchApproved,
      //   requestsMatchWithoutYearPlanApproved,
      //   subjectsToApprove: requestsTotalMatchApproved.length
      //     ? getSubjectsOrigin(requestsTotalMatchApproved)
      //     : requestsMatchWithoutYearPlanApproved.length
      //     ? getSubjectsOrigin(requestsMatchWithoutYearPlanApproved)
      //     : [],
      //   requestsMatch
      // }
    });
  } catch (error) {
    return next(error);
  }
};

exports.getStepperRequest = async (req, res, next) => {
  try {
    const { dataValues: request } = await getRequest(req.params.requestId);
    const sets = await getRequestsStepper(res.locals.user, request);
    const requestsStepper = await getSubjectsStepper(request, req.params.subjectId);
    request.originSubject = request.originSubjects[0].dataValues;
    delete request.originSubjects;
    delete request.originSubject.request_subject;
    return res.status(200).send({
      request,
      sets,
      requestsStepper: mapRequestsStepper(requestsStepper.dataValues)
    });
  } catch (error) {
    return next(error);
  }
};

exports.consultEquivalence = (req, res, next) =>
  updateConsultEquivalence(req.params.requestId, res.locals.professor, req.body)
    .then(() => {
      res.status(200).send('Request updated');
      return sendEmail(
        generateConsultToProfessorMail(req.params.requestId, res.locals.professor, req.params.subjectId)
      );
    })
    .then(() => {
      logger.info('Email sent to professor');
    })
    .catch(next);
