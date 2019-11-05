'use strict';

const { equivalences, withoutEvaluating } = require('../../app/constants/request');

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
      fk_subjectid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id'
        }
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
