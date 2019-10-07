'use strict';

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'request',
    {
      fileNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'file_number'
      },
      yearNote: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_note',
        defaultValue: 'N/I'
      },
      universityOrigin: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'university_origin'
      },
      careerOrigin: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'career_origin'
      },
      yearPlanOrigin: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_plan_origin',
        defaultValue: 'N/I'
      },
      subjectOrigin: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_origin'
      },
      courseMode: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'course_mode',
        defaultValue: 'N/I'
      },
      subjectOriginWeeklyHours: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_origin_weekly_hours',
        defaultValue: 'N/I'
      },
      subjectOriginTotalHours: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_origin_total_hours',
        defaultValue: 'N/I'
      },
      yearOfApproval: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'year_of_approval',
        defaultValue: 'N/I'
      },
      careerUnq: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'career_unq'
      },
      subjectUnq: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_unq'
      },
      subjectWeeklyHoursUnq: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_weekly_hours_unq',
        defaultValue: 'N/I'
      },
      subjectTotalHoursUnq: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_total_hours_unq',
        defaultValue: 'N/I'
      },
      subjectCoreUnq: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subject_core_unq',
        defaultValue: 'N/I'
      },
      credits: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'N/I'
      },
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
        type: DataTypes.STRING,
        defaultValue: 'SIN EVALUAR'
      },
      observations: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      }
    },
    {
      underscored: true,
      tableName: 'requests'
    }
  );
  Request.associate = function(models) {
    models.request.belongsTo(models.file, { foreignKey: 'fk_fileid', targetKey: 'id' });
  };
  return Request;
};
