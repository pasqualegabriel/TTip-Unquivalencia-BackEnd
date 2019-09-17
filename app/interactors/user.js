const { User } = require('../models');

exports.findAllUsers = () => User.findAll();

exports.findOneByEmail = email =>
  User.findOne({
    where: { email }
  });
