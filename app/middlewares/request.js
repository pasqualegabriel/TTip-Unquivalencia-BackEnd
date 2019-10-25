const { equivalences } = require('../constants/request'),
  { nonExistentRequestMessage } = require('../errors'),
  { getRequest } = require('../interactors/request');

exports.verifyEquivalence = (req, res, next) =>
  equivalences.includes(req.body.equivalence) ? next() : res.status(401).send('Invalid equivalence');

exports.validateRequest = (req, res, next) =>
  getRequest(parseInt(req.params.requestId))
    .then(request => {
      if (request) {
        res.locals.request = request.dataValues;
        return next();
      }
      return res.status(401).send(nonExistentRequestMessage);
    })
    .catch(next);
