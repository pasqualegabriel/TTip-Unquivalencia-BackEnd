const userInteractor = require('../interactors/user'),
  {
    invalidMailMessage,
    invalidPasswordMessage,
    nonExistentMailMessage,
    incorrectPasswordMessage,
    theEmailAlreadyExistsMessage,
    permissionDeniedMessage,
    youAreNotLoggedInMessage
  } = require('../errors'),
  { isEmail } = require('validator'),
  { compare: bcryptCompare } = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  { ADMIN } = require('../constants/user');

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

const verifyLogin = (req, res, next, permissions) => {
  if (req.headers.authorization) {
    const tokenString = req.headers.authorization.replace('Bearer ', '');
    const token = jwt.decode(tokenString, config.common.session.secret);
    return userInteractor
      .findOneByEmail(token.email)
      .then(anUser =>
        anUser && token && permissions.includes(anUser.role)
          ? next()
          : res.status(401).send([permissionDeniedMessage])
      );
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
