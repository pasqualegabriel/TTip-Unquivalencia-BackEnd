'use strict';

const { equivalences, equivalencesFinished, withoutEvaluating } = require('../../app/constants/request');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_fileid: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'files',
          key: 'id'
        }
      },
      file_number: {
        allowNull: false,
        type: Sequelize.STRING
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
      career_origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year_plan_origin: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_mode: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_origin_weekly_hours: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_origin_total_hours: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      year_of_approval: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      career_unq: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subject_unq: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subject_weekly_hours_unq: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_total_hours_unq: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      subject_core_unq: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      credits: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      year_of_equivalence: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      signature: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'N/I'
      },
      equivalence: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: equivalences,
        defaultValue: withoutEvaluating
      },
      observations: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      },
      professor_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      professor_equivalence: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: equivalencesFinished
      },
      professor_observations: {
        allowNull: true,
        type: Sequelize.STRING
      },
      comments_to_professor: {
        allowNull: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('requests')
};
