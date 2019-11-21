'use strict';

module.exports = (sequelize, DataTypes) => {
  const requestInfoSubject = sequelize.define(
    'request_info_subject',
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
      infoSubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'info_subject_id',
        references: {
          model: 'info_subjects',
          key: 'id'
        }
      }
    },
    { underscored: true, tableName: 'request_info_subjects' }
  );
  requestInfoSubject.associate = function(models) {
    // associations can be defined here
  };
  return requestInfoSubject;
};
