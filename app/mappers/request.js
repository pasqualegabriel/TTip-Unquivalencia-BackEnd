exports.mapRequestsStepper = ({ equivalence, originSubjects = [] }) =>
  originSubjects.map(({ dataValues: { id: subjectId, subject: subjectOrigin } }) => ({
    subjectId,
    equivalence,
    subjectOrigin
  }));

exports.mapOriginSubjectsToCreate = (requestId, subjectOriginIds = []) =>
  subjectOriginIds.map(subjectId => ({ requestId, subjectId }));

exports.mapSets = requests =>
  requests.map(request => {
    const firstSubject = request.dataValues.originSubjects[0].dataValues.id;
    delete request.dataValues.originSubjects;
    return { ...request.dataValues, firstSubject };
  });
