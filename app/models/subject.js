'use strict';

module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define(
    'subject',
    {
      code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      university: {
        allowNull: false,
        type: DataTypes.STRING
      },
      career: {
        allowNull: false,
        type: DataTypes.STRING
      },
      yearPlan: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_plan'
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING
      },
      courseMode: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'course_mode',
        defaultValue: 'N/I'
      },
      subjectWeeklyHours: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_weekly_hours',
        defaultValue: 'N/I'
      },
      subjectTotalHours: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_total_hours',
        defaultValue: 'N/I'
      },
      subjectCore: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_core',
        defaultValue: 'N/I'
      },
      credits: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      tableName: 'subjects'
    }
  );
  subject.associate = function(models) {
    models.subject.belongsToMany(models.request, { through: models.request_subject });
    models.subject.hasOne(models.request, { foreignKey: 'fk_subjectid', targetKey: 'id' });
  };
  return subject;
};
