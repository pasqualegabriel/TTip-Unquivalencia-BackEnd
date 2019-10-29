const { uniqBy, pickBy } = require('lodash'),
  { withoutEvaluating, equivalencesFinished } = require('../constants/request');

exports.mapNewFile = ({ fileNumber, universityOrigin, yearNote, mail, name, surname, dni, requests }) => ({
  fileNumber,
  universityOrigin,
  yearNote,
  mail,
  name,
  surname,
  dni,
  status: uniqBy(requests, 'subjectUnq').length,
  requests: requests.map(
    ({
      universityOrigin: universityOriginRequest,
      careerOrigin,
      yearPlanOrigin,
      subjectOrigin,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearOfApproval,
      careerUnq,
      subjectUnq,
      subjectWeeklyHoursUnq,
      subjectTotalHoursUnq,
      subjectCoreUnq,
      credits,
      yearOfEquivalence
    }) => ({
      fileNumber,
      universityOrigin: universityOriginRequest,
      yearNote,
      careerOrigin,
      yearPlanOrigin,
      subjectOrigin,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearOfApproval,
      careerUnq,
      subjectUnq,
      subjectWeeklyHoursUnq,
      subjectTotalHoursUnq,
      subjectCoreUnq,
      credits,
      yearOfEquivalence
    })
  )
});

exports.mapExistingFile = (fileId, { fileNumber, yearNote, requests }) =>
  requests.map(
    ({
      universityOrigin,
      careerOrigin,
      yearPlanOrigin,
      subjectOrigin,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearOfApproval,
      careerUnq,
      subjectUnq,
      subjectWeeklyHoursUnq,
      subjectTotalHoursUnq,
      subjectCoreUnq,
      credits,
      yearOfEquivalence
    }) => ({
      fileNumber,
      fk_fileid: fileId,
      universityOrigin,
      yearNote,
      careerOrigin,
      yearPlanOrigin,
      subjectOrigin,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearOfApproval,
      careerUnq,
      subjectUnq,
      subjectWeeklyHoursUnq,
      subjectTotalHoursUnq,
      subjectCoreUnq,
      credits,
      yearOfEquivalence
    })
  );

exports.mapUpdateFile = ({ fileNumber, universityOrigin, yearNote, mail, name, surname, dni, status }) =>
  pickBy({
    fileNumber,
    universityOrigin,
    yearNote,
    mail,
    name,
    surname,
    dni,
    status
  });

exports.mapFileByFileNumber = file => {
  const request = file.dataValues.requests.length ? file.dataValues.requests[0].dataValues : file.dataValues;
  delete file.dataValues.requests;
  return { ...file.dataValues, ...request };
};

exports.getStatus = (requestsSaved = [], newRequests = []) =>
  uniqBy(
    [
      ...requestsSaved.map(({ dataValues: { subjectUnq, equivalence } }) => ({ subjectUnq, equivalence })),
      ...newRequests.map(({ subjectUnq }) => ({ subjectUnq, equivalence: withoutEvaluating }))
    ].filter(({ equivalence }) => !equivalencesFinished.includes(equivalence)),
    'subjectUnq'
  ).length;
