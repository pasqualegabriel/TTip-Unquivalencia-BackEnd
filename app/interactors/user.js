const {
    User,
    Sequelize: { Op }
  } = require('../models'),
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
