'use strict';

module.exports = (sequelize, DataTypes) => {
  const RequestSubject = sequelize.define(
    'request_subject',
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'request_id',
        references: {
          model: 'requests',
          key: 'id'
        }
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'subject_id',
        references: {
          model: 'subjects',
          key: 'id'
        }
      }
    },
    {
      underscored: true,
      tableName: 'request_subjects'
    }
  );
  RequestSubject.associate = function(models) {};
  return RequestSubject;
};
