const { User } = require('../models'),
  errors = require('../errors');

exports.findAllUsers = () => User.findAll().catch(err => Promise.reject(errors.databaseError(err.message)));
