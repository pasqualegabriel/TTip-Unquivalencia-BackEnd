const { uniqBy, pickBy } = require('lodash');

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
      yearOfEquivalence,
      signature,
      observations
    }) => ({
      fileNumber,
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
      yearOfEquivalence,
      signature,
      observations
    })
  )
});

exports.mapExistingFile = (fileId, { fileNumber, universityOrigin, yearNote, requests }) =>
  requests.map(
    ({
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
      yearOfEquivalence,
      signature,
      observations
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
      yearOfEquivalence,
      signature,
      observations
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
  const request = file.dataValues.requests[0].dataValues;
  delete file.dataValues.requests;
  return { ...request, ...file.dataValues };
};
