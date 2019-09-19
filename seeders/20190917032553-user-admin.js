'use strict';

const bcrypt = require('bcryptjs'),
  {
    common: {
      admin: { name, lastName, email, password, role }
    }
  } = require('../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name,
          last_name: lastName,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
          role,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
