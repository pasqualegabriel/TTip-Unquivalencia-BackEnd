'use strict';

const { equivalences, withoutEvaluating } = require('../constants/request');

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
  };
  return Request;
};
