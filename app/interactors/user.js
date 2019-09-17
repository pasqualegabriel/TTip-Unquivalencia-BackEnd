const { User } = require('../models');

exports.findOneByEmail = email =>
  User.findOne({
    where: { email }
  });
