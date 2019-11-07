const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  logger = require('../logger'),
  { mapUserData, mapUpdateUser, mapEmails } = require('../mappers/user'),
  {
    createUser,
    findAndCountAllUsers,
    updateUser,
    updateUserFields,
    deleteUser,
    updatePassword,
    updateCode,
    findAllMails
  } = require('../interactors/user'),
  {
    generateNewPassword,
    generateNewUserMail,
    getPageParams,
    generateNewCode,
    generateCodeMail,
    generateNewPasswordMail
  } = require('../helpers'),
  sendEmail = require('../services/mail'),
  moment = require('moment'),
  bcrypt = require('bcryptjs');

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

exports.invalidateSessions = (_, res, next) => {
  logger.info(`Starting invalidate sessions`);
  return updateUser(res.locals.user, { invalidationDate: moment() })
    .then(() => res.status(200).send('All sessions have been invalidated successfully'))
    .catch(next);
};

exports.updateUser = (req, res, next) =>
  updateUserFields(mapUpdateUser(req.body))
    .then(() => res.status(200).send('User updated'))
    .catch(next);

exports.deleteUser = (req, res, next) =>
  deleteUser(req.params.userId)
    .then(() => res.status(200).send('User deleted'))
    .catch(next);

exports.updatePassword = (req, res, next) => {
  const newPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(8), null);
  return updatePassword(res.locals.user.id, newPassword)
    .then(() => res.status(200).send('Password updated successfully'))
    .catch(next);
};

exports.sendCode = (_, res, next) => {
  const code = generateNewCode();
  return updateCode(res.locals.user.id, code)
    .then(() => sendEmail(generateCodeMail(res.locals.user, code)))
    .then(() => res.status(200).send('Code sent successfully'))
    .catch(next);
};

exports.createNewPassword = (_, res, next) => {
  const newPassword = generateNewPassword();
  const newPasswordBcrypt = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
  return updatePassword(res.locals.user.id, newPasswordBcrypt)
    .then(() => sendEmail(generateNewPasswordMail(res.locals.user, newPassword)))
    .then(() => res.status(200).send('Password updated successfully'))
    .catch(next);
};

exports.getMails = (_, res, next) =>
  findAllMails()
    .then(mails => res.status(200).send(mapEmails(mails)))
    .catch(next);
