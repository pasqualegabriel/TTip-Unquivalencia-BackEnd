const { pickBy } = require('lodash');

exports.mapNewSubject = ({
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
  url
}) =>
  pickBy({
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
    url
  });
