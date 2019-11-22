const { get, orderBy } = require('lodash'),
  moment = require('moment');

exports.mapNewFile = ({ fileNumber, yearNote, mail, name, surname, dni, legajo }) => ({
  fileNumber,
  yearNote,
  mail,
  name,
  surname,
  dni,
  legajo
});

exports.mapFileByFileNumber = file => {
  const request = file.dataValues.requests.length ? file.dataValues.requests[0].dataValues : file.dataValues;
  delete file.dataValues.requests;
  return { ...file.dataValues, ...request };
};

exports.mapLetter = file => ({
  fileNumber: file.dataValues.fileNumber,
  name: file.dataValues.name,
  surname: file.dataValues.surname,
  mail: file.dataValues.mail,
  dni: file.dataValues.dni,
  legajo: file.dataValues.legajo,
  yearNote: file.dataValues.yearNote,
  currentDate: moment()
    .locale('es')
    .format('LL'),
  requests: file.dataValues.requests.map(request => ({
    id: get(request, ['dataValues', 'id']),
    universityOrigin: get(request, ['dataValues', 'originSubjects', 0, 'dataValues', 'university'], '-'),
    subjectOrigin: `${orderBy(
      request.dataValues.originSubjects.map(originSubject => originSubject.dataValues.subject),
      'subjectId'
    )}`.replace(/,/g, ', '),
    yearNote: get(file, ['dataValues', 'yearNote'], '-'),
    yearPlanOrigin: get(request, ['dataValues', 'originSubjects', 0, 'dataValues', 'yearPlan'], '-'),
    yearOfApproval: `${orderBy(
      request.dataValues.originSubjectsInfo.map(info => info.dataValues.yearOfApproval),
      'subjectId'
    )}`.replace(/,/g, ', '),
    subjectUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'subject'], '-'),
    yearPlanUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'yearPlan'], '-'),
    semanalUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'subjectWeeklyHours'], '-'),
    totalUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'subjectTotalHours'], '-'),
    coreUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'subjectCore'], '-'),
    creditsUnq: get(request, ['dataValues', 'unqSubject', 'dataValues', 'credits'], '-'),
    equivalence: get(request, ['dataValues', 'equivalence'], '-'),
    observations: get(request, ['dataValues', 'observations'], '-')
  }))
});
