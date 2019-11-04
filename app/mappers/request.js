exports.mapRequestsStepper = ({ equivalence, originSubjects = [] }) =>
  originSubjects.map(({ dataValues: { id: subjectId, subject: subjectOrigin } }) => ({
    subjectId,
    equivalence,
    subjectOrigin
  }));

exports.mapOriginSubjectsToCreate = (requestId, subjectOriginIds = []) =>
  subjectOriginIds.map(subjectId => ({ requestId, subjectId }));
