const { findAllUsers } = require('../services/user');

exports.getUsers = (req, res, next) =>
  findAllUsers()
    .then(users => res.status(200).send(users))
    .catch(next);
