const { groupBy, uniqBy } = require('lodash');

exports.mapSetRequests = requests => {
  const requestsBySubjectUnq = groupBy(requests, 'subjectUnq');
  const sets = uniqBy(requests, 'subjectUnq');
  return sets.map(({ requestId, subjectUnq }) => ({
    requestId,
    subjectUnq,
    subjectsOrigin: requestsBySubjectUnq[subjectUnq]
  }));
};
