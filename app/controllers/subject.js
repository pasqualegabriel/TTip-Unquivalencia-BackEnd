const { mapNewSubject } = require('../mappers/subject'),
  { createSubject, findAndCountAllSubjects } = require('../interactors/subject'),
  { getPageParams } = require('../helpers');

exports.addSubject = (req, res, next) => {
  createSubject(mapNewSubject(req.body))
    .then(() => res.status(200).send('Subject created successfully'))
    .catch(next);
};

exports.getSubjects = (req, res, next) => {
  const { limit, offset } = getPageParams(req.query);
  return findAndCountAllSubjects(req.query, offset, limit)
    .then(({ count, rows: subjects }) =>
      res.status(200).send({
        subjects,
        total_pages: limit ? Math.ceil(count / limit) : 1
      })
    )
    .catch(next);
};
