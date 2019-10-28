const { equivalences, equivalencesFinished } = require('../constants/request'),
  { nonExistentRequestMessage, requestFinishedMessage } = require('../errors'),
  { getRequest } = require('../interactors/request');

exports.verifyEquivalence = (req, res, next) =>
  equivalences.includes(req.body.equivalence) ? next() : res.status(401).send('Invalid equivalence');

exports.validateRequest = (req, res, next) =>
  getRequest(parseInt(req.params.requestId))
    .then(request => {
      if (request) {
        res.locals.request = request.dataValues;
        return equivalencesFinished.includes(request.dataValues.equivalence)
          ? res.status(401).send(requestFinishedMessage)
          : next();
      }
      return res.status(401).send(nonExistentRequestMessage);
    })
    .catch(next);
