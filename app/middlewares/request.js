const { equivalences } = require('../constants/request');

exports.verifyEquivalence = (req, res, next) =>
  equivalences.includes(req.body.equivalence) ? next() : res.status(401).send('Invalid equivalence');
