const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  logger = require('../logger'),
  { mapUserData } = require('../mappers/user'),
  { createUser, findAndCountAllUsers } = require('../interactors/user'),
  { generateNewPassword, generateNewUserMail, getPageParams } = require('../helpers'),
  sendEmail = require('../services/mail');

exports.signIn = (_, res) => {
  const user = mapUserData(res.locals.user);
  const token = jwt.sign(user, config.common.session.secret);
  logger.info(`${user.email} logged in correctly`);
  return res.status(200).send({
    user,
    token
  });
};

exports.signUp = (req, res, next) => {
  logger.info('Starting user creation');
  const user = req.body;
  user.password = generateNewPassword();
  logger.info('Creating user');
  return createUser(user)
    .then(() => {
      logger.info(`User ${user.email} was created successfully`);
      res.status(200).send('User created successfully');
      logger.info('Sending email');
      return sendEmail(generateNewUserMail(user));
    })
    .then(() => {
      logger.info(`Email with password to ${user.email} was sent successfully`);
    })
    .catch(next);
};

exports.users = (req, res, next) => {
  const { limit, offset } = getPageParams(req.query);
  return findAndCountAllUsers(req.query, offset, limit)
    .then(({ count, rows: users }) =>
      res.status(200).send({
        users,
        total_pages: limit ? Math.ceil(count / limit) : 1
      })
    )
    .catch(next);
};
