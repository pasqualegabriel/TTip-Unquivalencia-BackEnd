const userInteractor = require('../interactors/user'),
  {
    invalidMailMessage,
    invalidPasswordMessage,
    nonExistentMailMessage,
    incorrectPasswordMessage
  } = require('../errors'),
  { isEmail } = require('validator'),
  { compare: bcryptCompare } = require('bcryptjs');

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
      } else {
        if (!user) errors.push(nonExistentMailMessage);
        return res.status(401).send(errors);
      }
    })
    .catch(next);
};

exports.verifyPassword = (req, res, next) => {
  const { password } = req.body;
  const { password: passwordUserStored } = res.locals.user;
  return bcryptCompare(password, passwordUserStored)
    .then(samePassword => (samePassword ? next() : res.status(401).send(incorrectPasswordMessage)))
    .catch(next);
};
