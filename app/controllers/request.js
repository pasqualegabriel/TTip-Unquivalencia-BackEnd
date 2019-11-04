const {
    findRequests,
    updateRequest,
    getRequest,
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
    getSubjectsStepper,
    deleteRequest
  } = require('../interactors/request'),
  { findFile, createFile, decrementFileStatus, incrementStatusToFile } = require('../interactors/file'),
  { mapNewFile } = require('../mappers/file'),
  { mapRequestsStepper, mapOriginSubjectsToCreate } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { PROFESSOR } = require('../constants/user'),
  { differenceBy } = require('lodash'),
  { generateConsultToProfessorMail } = require('../helpers'),
  sendEmail = require('../services/mail'),
  { sequelize } = require('../models'),
  logger = require('../logger');

const createAndGetRequest = (file, body, transaction) =>
  findRequestBySubjectUnqId(file.id, body.subjectUnqId, transaction).then(request =>
    request
      ? updateToWithoutEvaluating(request, transaction)
      : createRequest(file.id, body.subjectUnqId, transaction)
  );

const createRequestsToFile = async (file, body) => {
  try {
    const transaction = await sequelize.transaction();
    const request = await createAndGetRequest(file, body, transaction);
    const requestId = request.dataValues ? request.dataValues.id : request[1][0].dataValues.id;
    await createRequestSubject(mapOriginSubjectsToCreate(requestId, body.subjectOriginIds), transaction);
    if (request.dataValues) await incrementStatusToFile(file.id, transaction);
    await transaction.commit();
    return request;
  } catch (error) {
    return Promise.reject(error);
  }
};

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

exports.updateEquivalence = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();
    await updateRequest(req.params.requestId, req.body, res.locals.user.name, transaction);
    if (
      !equivalencesFinished.includes(res.locals.request.equivalence) &&
      equivalencesFinished.includes(req.body.equivalence)
    )
      await decrementFileStatus(res.locals.request.fk_fileid, transaction);
    await transaction.commit();
    return res.status(200).send('Request updated');
  } catch (error) {
    return next(error);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();
    const request = await getRequest(req.params.requestId);
    if (equivalencesFinished.includes(req.body.equivalence))
      await decrementFileStatus(request.fk_fileid, transaction);
    await deleteRequest(req.params.requestId, transaction);
    await transaction.commit();
    return res.status(200).send('Request deleted');
  } catch (error) {
    return next(error);
  }
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
    request.originSubject = request.originSubjects[0].dataValues;
    const requestsTotalMatchApproved = await findRequestsTotalMatch(request);
    const requestsMatchWithoutYearPlanApproved = requestsTotalMatchApproved.length
      ? []
      : await findRequestsMatchWithoutYearPlanOrigin(request);
    const requestsMatch =
      requestsTotalMatchApproved.length || requestsMatchWithoutYearPlanApproved.length
        ? []
        : await findRequestsMatch(request);
    const getSubjectsOrigin = someRequests =>
      differenceBy(someRequests, request.originSubjects.map(({ dataValues }) => dataValues), 'subject').map(
        ({ subject: subjectOrigin }) => subjectOrigin
      );
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
