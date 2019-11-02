const { groupBy, uniqBy } = require('lodash');

exports.mapSetRequests = (requests, request) => {
  const requestsBySubjectUnq = groupBy(requests, 'subjectUnq');
  const sets = uniqBy(requests, 'subjectUnq').map(
    ({
      requestId,
      subjectUnq,
      equivalence,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearPlanOrigin,
      credits
    }) => ({
      requestId,
      subjectUnq,
      equivalence,
      courseMode,
      subjectOriginWeeklyHours,
      subjectOriginTotalHours,
      yearPlanOrigin,
      credits
    })
  );
  return { sets, requestsStepper: requestsBySubjectUnq[request.subjectUnq], request };
};

exports.mapRequestsStepper = ({ equivalence, originSubjects = [] }) =>
  originSubjects.map(({ dataValues: { id: subjectId, subject: subjectOrigin } }) => ({
    subjectId,
    equivalence,
    subjectOrigin
  }));
