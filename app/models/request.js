'use strict';

const { equivalences, withoutEvaluating, types, external } = require('../constants/request');

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'request',
    {
      yearOfEquivalence: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_of_equivalence',
        defaultValue: 'N/I'
      },
      signature: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
      equivalence: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: equivalences,
        defaultValue: withoutEvaluating
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: types,
        defaultValue: external
      },
      observations: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      professorId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'professor_id'
      },
      commentsToProfessor: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'comments_to_professor'
      }
    },
    {
      underscored: true,
      tableName: 'requests'
    }
  );
  Request.associate = function(models) {
    models.request.belongsTo(models.file, { foreignKey: 'fk_fileid', targetKey: 'id' });
    models.request.belongsToMany(models.subject, { through: models.request_subject, as: 'originSubjects' });
    models.request.belongsTo(models.subject, {
      foreignKey: 'fk_subjectid',
      targetKey: 'id',
      as: 'unqSubject'
    });
    models.request.belongsToMany(models.info_subject, {
      through: models.request_info_subject,
      as: 'originSubjectsInfo'
    });
  };
  return Request;
};
