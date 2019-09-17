const bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  logger = require('../logger'),
  { findAllUsers } = require('../interactors/user');

exports.getUsers = (_, res, next) =>
  findAllUsers()
    .then(users => res.status(200).send(users))
    .catch(next);

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  const { id, password: passwordUserLogged, role, name, lastName } = res.locals.user;
  return bcrypt
    .compare(password, passwordUserLogged)
    .then(samePassword => {
      if (samePassword) {
        logger.info(`${email} logged in correctly`);
        const user = {
          id,
          email,
          name,
          lastName,
          role
        };
        const token = jwt.sign(user, config.common.session.secret);
        return res.status(200).send({
          user,
          token
        });
      } else return res.status(401).send('Incorrect password');
    })
    .catch(next);
};
