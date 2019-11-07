const { sequelize, Sequelize, user: User } = require('../models'),
  { pickBy } = require('lodash'),
  { substring } = require('../helpers');

exports.findOneByEmail = email =>
  User.findOne({
    where: { email }
  });

exports.createUser = user => User.create(user);

exports.findAndCountAllUsers = (
  { email, name, lastName, role, field = 'created_at', order: orderBy = 'desc' },
  offset,
  limit
) => {
  const order = field && orderBy ? [[field, orderBy]] : [];
  const where = pickBy({
    email: substring(email),
    name: substring(name),
    lastName: substring(lastName),
    role
  });
  return User.findAndCountAll({
    attributes: [
      'id',
      'name',
      ['last_name', 'lastName'],
      'email',
      'role',
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt']
    ],
    where,
    ...pickBy({ offset, limit }),
    order
  });
};

exports.updateUser = (user, params) => user.update(params);

exports.updateUserFields = toUpdate =>
  exports.findOneByEmail(toUpdate.email).then(user => user.update(toUpdate));

exports.deleteUser = id => User.destroy({ where: { id } });

exports.updatePassword = (id, password) =>
  sequelize.query(`update users set password = '${password}' where id = ${id}`, {
    type: Sequelize.QueryTypes.UPDATE
  });

exports.updateCode = (id, code) =>
  sequelize.query(`update users set code = '${code}' where id = ${id}`, {
    type: Sequelize.QueryTypes.UPDATE
  });

exports.findAllMails = () =>
  User.findAll({
    attributes: ['email']
  });
