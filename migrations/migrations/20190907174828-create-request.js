'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      univesity_origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subject_origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subject_unq: {
        allowNull: false,
        type: Sequelize.STRING
      },
      equivalence: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('requests');
  }
};
