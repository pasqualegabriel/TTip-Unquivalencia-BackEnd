const userInteractor = require('../interactors/user'),
  { getRequest } = require('../interactors/request'),
  {
    invalidMailMessage,
    invalidPasswordMessage,
    nonExistentMailMessage,
    incorrectPasswordMessage,
    theEmailAlreadyExistsMessage,
    permissionDeniedMessage,
    youAreNotLoggedInMessage,
    sessionExpiredMessage,
    differntPasswordMessage,
    theEmailDoesNotExistsMessage
  } = require('../errors'),
  { isEmail } = require('validator'),
  { compare: bcryptCompare } = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  { ADMIN, USER, roles } = require('../constants/user'),
  moment = require('moment');

const baseValidation = (email, password) => {
  const errors = [];
  const isValidEmail = isEmail(email);
  const isPasswordValid = password && password.length >= 8;
  if (!isValidEmail) errors.push(invalidMailMessage);
  if (!isPasswordValid) errors.push(invalidPasswordMessage);
  return { errors, isValidEmail, isPasswordValid };
};

exports.validateLogin = (req, res, next) => {
  const { errors, isValidEmail, isPasswordValid } = baseValidation(req.body.email, req.body.password);
  return userInteractor
    .findOneByEmail(req.body.email)
    .then(user => {
      if (user && isValidEmail && isPasswordValid) {
        res.locals.user = user;
        return next();
      }
      if (!user) errors.push(nonExistentMailMessage);
      return res.status(401).send(errors);
    })
    .catch(next);
};

exports.verifyPassword = (req, res, next) => {
  const { password } = req.body;
  const { password: passwordUserStored } = res.locals.user;
  return bcryptCompare(password, passwordUserStored)
    .then(samePassword => (samePassword ? next() : res.status(401).send([incorrectPasswordMessage])))
    .catch(next);
};

const verifyLogin = (req, res, next, permissions, professorId) => {
  if (req.headers.authorization) {
    const tokenString = req.headers.authorization.replace('Bearer ', '');
    const token = jwt.decode(tokenString, config.common.session.secret);
    return userInteractor.findOneByEmail(token.email).then(anUser => {
      if (
        anUser &&
        token &&
        (permissions.includes(anUser.role) || (professorId && professorId === anUser.id))
      ) {
        res.locals.user = anUser;
        const invalidationTime = moment(token.lastSignInDate);
        const invalidationDate = moment(anUser.invalidationDate);
        invalidationTime.add(config.common.session.invalidationTimeInMinutes, 'minutes');
        return invalidationTime > moment() && moment(token.lastSignInDate) > invalidationDate
          ? next()
          : res.status(450).send([sessionExpiredMessage]);
      } else return res.status(401).send([permissionDeniedMessage]);
    });
  } else return res.status(401).send([youAreNotLoggedInMessage]);
};

exports.validateNewUser = (req, res, next) => {
  const errors = [];
  const isValidEmail = isEmail(req.body.email);
  if (!isValidEmail) errors.push(invalidMailMessage);
  return userInteractor.findOneByEmail(req.body.email).then(oldUser => {
    if (!oldUser && isValidEmail) return next();
    if (oldUser) errors.push(theEmailAlreadyExistsMessage);
    return res.status(401).send(errors);
  });
};

exports.verifyAdminLogin = (req, res, next) => verifyLogin(req, res, next, [ADMIN]);

exports.verifyAdminAndUserLogin = (req, res, next) => verifyLogin(req, res, next, [ADMIN, USER]);

exports.verifyAuthentication = (req, res, next) => verifyLogin(req, res, next, roles);

const verifyRequestsAuthentication = (req, res, next, someRoles) =>
  getRequest(req.params.requestId)
    .then(request => {
      res.locals.request = request.dataValues;
      return verifyLogin(req, res, next, someRoles, res.locals.request.professorId);
    })
    .catch(next);

exports.verifyUpdateEquivalenceAuthentication = (req, res, next) =>
  verifyRequestsAuthentication(req, res, next, [ADMIN]);

exports.verifyGetRequestAuthentication = (req, res, next) =>
  verifyRequestsAuthentication(req, res, next, [ADMIN, USER]);

exports.validateProfessor = (req, res, next) =>
  userInteractor.findOneByEmail(req.body.email).then(professor => {
    if (professor && isEmail(req.body.email)) {
      res.locals.professor = professor.dataValues;
      return next();
    }
    return res.status(401).send(nonExistentMailMessage);
  });

exports.verifyNewPassword = (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  return newPassword === confirmPassword ? next() : res.status(401).send(differntPasswordMessage);
};

exports.validateEmail = (req, res, next) => {
  const errors = [];
  const isValidEmail = req.body.email && isEmail(req.body.email);
  if (!isValidEmail) errors.push(invalidMailMessage);
  return userInteractor.findOneByEmail(req.body.email).then(user => {
    if (user && isValidEmail) {
      res.locals.user = user;
      return next();
    }
    if (!user) errors.push(theEmailDoesNotExistsMessage);
    return res.status(401).send(errors);
  });
};

exports.validateCode = (req, res, next) =>
  req.body.code && res.locals.user.code === req.body.code ? next() : res.status(401).send(['Invalid code']);
