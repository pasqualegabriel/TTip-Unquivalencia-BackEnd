'use strict';

module.exports = (sequelize, DataTypes) => {
  const infoSubjects = sequelize.define(
    'info_subject',
    {
      yearOfApproval: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_of_approval',
        defaultValue: '-'
      },
      mark: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '-'
      }
    },
    { underscored: true, tableName: 'info_subjects' }
  );
  infoSubjects.associate = function(models) {
    models.info_subject.belongsToMany(models.request, { through: models.request_info_subject });
  };
  return infoSubjects;
};
