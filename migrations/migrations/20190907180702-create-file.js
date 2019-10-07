'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('files', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mail: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dni: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      year_note: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      university_origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('files')
};
