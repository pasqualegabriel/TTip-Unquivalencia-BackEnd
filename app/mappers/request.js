const { groupBy, uniqBy } = require('lodash');

exports.mapSetRequests = (requests, request) => {
  const requestsBySubjectUnq = groupBy(requests, 'subjectUnq');
  const sets = uniqBy(requests, 'subjectUnq').map(({ requestId, subjectUnq }) => ({
    requestId,
    subjectUnq,
    subjectsOrigin: requestsBySubjectUnq[subjectUnq]
  }));
  return { sets, requestsStepper: requestsBySubjectUnq[request.subjectUnq], request };
};
