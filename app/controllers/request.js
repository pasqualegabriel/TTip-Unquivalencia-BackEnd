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
    updateRequestsWithoutEvaluating
  } = require('../interactors/request'),
  { findFile, createFile, updateFile, decrementFileStatus } = require('../interactors/file'),
  { mapExistingFile, mapNewFile, mapUpdateFile, getStatus } = require('../mappers/file'),
  { mapSetRequests } = require('../mappers/request'),
  { equivalencesFinished } = require('../constants/request'),
  { differenceBy } = require('lodash'),
  logger = require('../logger');

exports.addRequest = (req, res, next) =>
  findFile(req.body.fileNumber)
    .then(file => {
      logger.info(`File ${file ? 'already' : 'does not'} exists`);
      return file
        ? createRequestToFile(mapExistingFile(file.dataValues.id, req.body))
            .then(() =>
              updateRequestsWithoutEvaluating(
                file.dataValues.id,
                req.body.requests.map(({ subjectUnq }) => subjectUnq)
              )
            )
            .then(() =>
              updateFile(
                mapUpdateFile({
                  status: getStatus(file.requests, req.body.requests)
                }),
                file.dataValues.id
              )
            )
        : createFile(mapNewFile(req.body));
    })
    .then(() => res.status(200).send('Request created successfully'))
    .catch(next);

exports.getRequestsByFileId = (req, res, next) =>
  findRequests(req.params.fileId)
    .then(requests => res.status(200).send(requests))
    .catch(next);

exports.updateEquivalence = (req, res, next) =>
  getRequest(req.params.requestId)
    .then(request => {
      if (equivalencesFinished.includes(request.dataValues.equivalence))
        return res.status(200).send('Request already updated');
      return updateRequest(request.dataValues, req.body, res.locals.user.name)
        .then(() =>
          equivalencesFinished.includes(req.body.equivalence)
            ? decrementFileStatus(request.dataValues.fk_fileid)
            : Promise.resolve()
        )
        .then(() => res.status(200).send('Request updated'));
    })
    .catch(next);

exports.getRequest = (req, res, next) =>
  getRequest(req.params.requestId)
    .then(request => res.status(200).send(request))
    .catch(next);

exports.getRequestMatchs = async (req, res, next) => {
  try {
    const { dataValues: request } = await getRequest(req.params.requestId);
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

exports.getStepperRequest = (req, res, next) =>
  getRequest(parseInt(req.params.requestId))
    .then(request => findRequestsStepper(request.dataValues.fk_fileid))
    .then(requests => res.status(200).send(mapSetRequests(requests)))
    .catch(next);
