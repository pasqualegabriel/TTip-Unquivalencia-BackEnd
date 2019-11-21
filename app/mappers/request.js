exports.mapRequestsStepper = ({ equivalence, originSubjects = [] }) =>
  originSubjects.map(({ dataValues: { id: subjectId, subject: subjectOrigin } }) => ({
    subjectId,
    equivalence,
    subjectOrigin
  }));

exports.mapOriginSubjectsToCreate = (requestId, subjectOriginIds = []) =>
  subjectOriginIds.map(subjectId => ({ requestId, subjectId }));

exports.mapCreateInfoSubjects = (subjectOrigins = []) =>
  subjectOrigins.map(({ id: subjectId, yearOfApproval, mark }) => ({ subjectId, yearOfApproval, mark }));

exports.mapOriginSubjectsInfoToCreate = (requestId, infoSubjects = []) =>
  infoSubjects.map(({ dataValues: { id: infoSubjectId } }) => ({ requestId, infoSubjectId }));

exports.mapSets = requests =>
  requests.map(request => {
    const firstSubject = request.dataValues.originSubjects[0].dataValues.id;
    delete request.dataValues.originSubjects;
    return { ...request.dataValues, firstSubject };
  });
