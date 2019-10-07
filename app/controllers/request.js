const {
    createRequestToFile,
    findRequests,
    updateRequest,
    getRequest,
    getRequestMatch,
    findRequestsTotalMatch,
    findRequestsMatch
  } = require('../interactors/request'),
  { findFile, createFile } = require('../interactors/file'),
  { mapExistingFile, mapNewFile } = require('../mappers/file'),
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

exports.getRequestMatchs = (req, res, next) =>
  getRequestMatch(req.body)
    .then(requests =>
      findRequestsTotalMatch(requests[0]).then(requestsTotalMatch => ({
        requests,
        requestsTotalMatch
      }))
    )
    .then(request =>
      request.requestsTotalMatch.length
        ? Promise.resolve({ ...request, requestsMatch: [] })
        : findRequestsMatch(request.requests[0]).then(requestsMatch => ({
            ...request,
            requestsMatch
          }))
    )
    .then(request => res.status(200).send(request))
    .catch(next);
