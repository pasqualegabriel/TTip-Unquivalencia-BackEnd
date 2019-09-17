const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  logger = require('../logger'),
  { mapUserData } = require('../mappers/user');

exports.signIn = (_, res) => {
  const user = mapUserData(res.locals.user);
  const token = jwt.sign(user, config.common.session.secret);
  logger.info(`${user.email} logged in correctly`);
  return res.status(200).send({
    user,
    token
  });
};
