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
    deleteRequest,
    findAndCountAllRequests,
    createInfoSubjects,
    createRequestSubjectInfo,
    createRequestDuplicate
  } = require('../interactors/request'),
  { findFile, decrementFileStatus, incrementStatusToFile, getFile } = require('../interactors/file'),
  { getSubjectById } = require('../interactors/subject'),
  { findAllAdmins } = require('../interactors/user'),
  {
    mapRequestsStepper,
    mapOriginSubjectsToCreate,
    mapSets,
    mapCreateInfoSubjects,
    mapOriginSubjectsInfoToCreate
  } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { PROFESSOR, USER } = require('../constants/user'),
  { differenceBy, find } = require('lodash'),
  { getPageParams, generateConsultToProfessorMail, generateProfessorResponseMail } = require('../helpers'),
  sendEmail = require('../services/mail'),
  { sequelize } = require('../models'),
  logger = require('../logger');

const createAndGetRequest = async (file, body, transaction) => {
  const request = await findRequestBySubjectUnqId(file.id, body.subjectUnqId, transaction);
  if (request) {
    if (equivalencesFinished.includes(request.dataValues.equivalence))
      await incrementStatusToFile(file.id, transaction);
    await updateToWithoutEvaluating(request, transaction);
    return request;
  } else {
    const requestToReturn = await createRequest(file.id, body, transaction);
    await incrementStatusToFile(file.id, transaction);
    return requestToReturn;
  }
};

exports.createRequestsToFile = async (file, body, transaction) => {
  const request = await createAndGetRequest(file, body, transaction);
  const requestId = request.dataValues ? request.dataValues.id : request[1][0].dataValues.id;
  const infoSubjects = await createInfoSubjects(mapCreateInfoSubjects(body.subjectOrigins), transaction);
  await createRequestSubjectInfo(mapOriginSubjectsInfoToCreate(requestId, infoSubjects), transaction);
  await createRequestSubject(
    mapOriginSubjectsToCreate(requestId, body.subjectOrigins.map(({ id }) => id)),
    transaction
  );
  return request;
};

exports.addRequest = async (req, res, next) => {
  try {
    const file = await findFile(req.body.fileNumber);
    logger.info(`File ${file ? 'already' : 'does not'} exists`);
    if (file) {
      const transaction = await sequelize.transaction();
      const newRequest = await exports.createRequestsToFile(file.dataValues, req.body, transaction);
      await transaction.commit();
      return res.status(200).send(newRequest);
    }
    return res.status(401).send('File does not exists');
  } catch (error) {
    return next(error);
  }
};

exports.createRequestsToFileDuplicate = async (file, body, transaction) => {
  const request = await createRequestDuplicate(file.id, body, transaction);
  if (!equivalencesFinished.includes(body.equivalence)) await incrementStatusToFile(file.id, transaction);
  const requestId = request.dataValues.id;
  const infoSubjects = await createInfoSubjects(mapCreateInfoSubjects(body.subjectOrigins), transaction);
  await createRequestSubjectInfo(mapOriginSubjectsInfoToCreate(requestId, infoSubjects), transaction);
  await createRequestSubject(
    mapOriginSubjectsToCreate(requestId, body.subjectOrigins.map(({ id }) => id)),
    transaction
  );
  return request;
};

const findRequestsByFileId = ({ id, role }, fileId) =>
  role === PROFESSOR ? findAllRequestsProfessor(id, fileId) : findRequests(fileId);

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
    if ([PROFESSOR, USER].includes(res.locals.user.role)) {
      const file = await getFile(res.locals.request.fk_fileid);
      const admins = await findAllAdmins();
      sendEmail(
        generateProfessorResponseMail(
          res.locals.request,
          res.locals.user,
          file,
          admins.map(({ email }) => email)
        )
      );
    }
    return res.status(200).send('Request updated');
  } catch (error) {
    return next(error);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();
    const request = await getRequest(req.params.requestId);
    if (!equivalencesFinished.includes(request.dataValues.equivalence))
      await decrementFileStatus(request.dataValues.fk_fileid, transaction);
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
    request.originSubject = find(
      request.originSubjects,
      subject => subject.dataValues.id === parseInt(req.params.subjectId)
    ).dataValues;
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
    const requestsStepper = await getSubjectsStepper(request);
    request.originSubject = find(
      request.originSubjects,
      subject => subject.dataValues.id === parseInt(req.params.subjectId)
    );
    request.originSubjectInfo = find(
      request.originSubjectsInfo,
      ({ dataValues: { subjectId } }) => subjectId === parseInt(req.params.subjectId)
    );
    delete request.originSubjectsInfo;
    delete request.originSubjects;
    delete request.originSubject.dataValues.request_subject;
    return res.status(200).send({
      request,
      sets: mapSets(sets),
      requestsStepper: mapRequestsStepper(requestsStepper.dataValues)
    });
  } catch (error) {
    return next(error);
  }
};

exports.consultEquivalence = async (req, res, next) => {
  try {
    await updateConsultEquivalence(req.params.requestId, res.locals.professor, req.body);
    logger.info('Request updated');
    const request = await getRequest(parseInt(req.params.requestId));
    const subject = await getSubjectById(parseInt(req.params.subjectId));
    const file = await getFile(request.dataValues.fk_fileid);
    res.status(200).send('Request updated');
    return sendEmail(generateConsultToProfessorMail(request, res.locals.professor, subject, file));
  } catch (error) {
    return next(error);
  }
};

exports.getRequests = (req, res, next) => {
  const { limit, offset } = getPageParams(req.query);
  return findAndCountAllRequests(req.query, offset, limit)
    .then(({ count, rows: requests }) =>
      res.status(200).send({
        requests,
        total_pages: limit ? Math.ceil(count / limit) : 1
      })
    )
    .catch(next);
};
