const { subject: Subject, sequelize, Sequelize } = require('../models'),
  { pickBy } = require('lodash'),
  { substring } = require('../helpers');

exports.createSubject = subject => Subject.create(subject);

exports.findAndCountAllSubjects = (
  {
    code,
    university,
    career,
    yearPlan,
    subject,
    courseMode,
    subjectWeeklyHours,
    subjectTotalHours,
    subjectCore,
    credits,
    url,
    field = 'created_at',
    order: orderBy = 'desc'
  },
  offset,
  limit
) => {
  const order = field && orderBy ? [[field, orderBy]] : [];
  const where = pickBy({
    code: substring(code),
    university: substring(university),
    career: substring(career),
    yearPlan: substring(yearPlan),
    subject: substring(subject),
    courseMode: substring(courseMode),
    subjectWeeklyHours: substring(subjectWeeklyHours),
    subjectTotalHours: substring(subjectTotalHours),
    subjectCore: substring(subjectCore),
    credits: substring(credits),
    url: substring(url)
  });
  return Subject.findAndCountAll({
    where,
    ...pickBy({ offset, limit }),
    order
  });
};

exports.getUniversities = () =>
  sequelize.query('select distinct(university) from subjects;', {
    type: Sequelize.QueryTypes.SELECT
  });

exports.getCareers = ({ university }) =>
  sequelize.query(`select distinct(career) from subjects where university = '${university}';`, {
    type: Sequelize.QueryTypes.SELECT
  });

exports.getPlanYears = ({ university, career }) =>
  sequelize.query(
    `select distinct(year_plan) from subjects where university = '${university}' and career = '${career}';`,
    {
      type: Sequelize.QueryTypes.SELECT
    }
  );

exports.getSubject = ({ university, career, yearPlan }) =>
  Subject.findOne({
    where: {
      university,
      career,
      yearPlan
    }
  });
