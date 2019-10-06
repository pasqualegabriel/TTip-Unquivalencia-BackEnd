'use strict';

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    'file',
    {
      fileNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'file_number'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      surname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      mail: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
      dni: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
      year_note: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
      universityOrigin: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'university_origin'
      }
    },
    {
      underscored: true,
      tableName: 'files'
    }
  );
  File.associate = function(models) {
    models.file.hasMany(models.request, { foreignKey: 'fk_fileid', sourceKey: 'id' });
  };
  return File;
};
