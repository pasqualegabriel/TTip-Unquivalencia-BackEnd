const { findAllUsers } = require('../interactors/user');

exports.getUsers = (_, res, next) =>
  findAllUsers()
    .then(users => res.status(200).send(users))
    .catch(next);
