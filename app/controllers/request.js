const { findAllUsers } = require('../interactors/user');

exports.addRequest = (req, res, next) =>
  findAllUsers()
    .then(users => res.status(200).send(users))
    .catch(next);
