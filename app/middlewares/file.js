const { flatMap, pickBy } = require('lodash');

const verifyField = (fields, field, index) =>
  fields[field] ? [] : [{ message: `'${field}' is required at position ${index}`, field, index }];

const verifyRequestFields = ({ careerOrigin, subjectOrigin, careerUnq, subjectUnq }, index) => {
  const fields = pickBy({ careerOrigin, subjectOrigin, careerUnq, subjectUnq });
  return flatMap(Object.keys(fields), field => verifyField(fields, field, index));
};

exports.verifyRequests = (req, res, next) => {
  const errors = flatMap(req.body.requests, (request, index) => verifyRequestFields(request, index));
  return errors.length ? res.status(401).send(errors) : next();
};
