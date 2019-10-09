const {
    createRequestToFile,
    findRequests,
    updateRequest,
    getRequest,
    getRequestMatch,
    findRequestsTotalMatch,
    findRequestsMatchWithoutYearPlanOrigin,
    findRequestsMatch
  } = require('../interactors/request'),
  { findFile, createFile } = require('../interactors/file'),
  { mapExistingFile, mapNewFile } = require('../mappers/file'),
  { find } = require('lodash'),
  logger = require('../logger');

exports.addRequest = (req, res, next) =>
  findFile(req.body.fileNumber)
    .then(file => {
      logger.info(`File ${file ? 'already' : 'does not'} exists`);
      return file
        ? createRequestToFile(mapExistingFile(file.dataValues.id, req.body))
        : createFile(mapNewFile(req.body));
    })
    .then(() => res.status(200).send('Request created successfully'))
    .catch(next);

exports.getRequestsByFileId = (req, res, next) =>
  findRequests(req.params.fileId)
    .then(requests => res.status(200).send(requests))
    .catch(next);

exports.updateEquivalence = (req, res, next) =>
  updateRequest(req.params.requestId, req.body)
    .then(() => res.status(200).send('Request updated'))
    .catch(next);

exports.getRequest = (req, res, next) =>
  getRequest(req.params.requestId)
    .then(request => res.status(200).send(request))
    .catch(next);

exports.getRequestMatchs = async (req, res, next) => {
  try {
    const requests = await getRequestMatch(req.query);
    const request = find(requests, { id: parseInt(req.query.requestId) });
    const requestsTotalMatchApproved = await findRequestsTotalMatch(request);
    const requestsMatchWithoutYearPlanApproved = requestsTotalMatchApproved.length
      ? []
      : await findRequestsMatchWithoutYearPlanOrigin(request);
    const requestsMatch =
      requestsTotalMatchApproved.length || requestsMatchWithoutYearPlanApproved.length
        ? []
        : await findRequestsMatch(request);
    return res.status(200).send({
      request,
      requests,
      requestsTotalMatchApproved,
      requestsMatchWithoutYearPlanApproved,
      requestsMatch
    });
  } catch (error) {
    return next(error);
  }
};
