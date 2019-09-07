const { User } = require('../models');

exports.findAllUsers = () => User.findAll();
