'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      university: {
        allowNull: false,
        type: Sequelize.STRING
      },
      career: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year_plan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_mode: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_weekly_hours: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_total_hours: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_core: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      credits: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      url: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subjects');
  }
};
