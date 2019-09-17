'use strict';

const bcrypt = require('bcryptjs'),
  { roles } = require('../constants/user');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, field: 'last_name', allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: roles,
        defaultValue: 'user'
      }
    },
    {
      underscored: true,
      tableName: 'users',
      hooks: {
        afterValidate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        }
      }
    }
  );
  return User;
};
