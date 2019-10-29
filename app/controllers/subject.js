const { mapNewSubject } = require('../mappers/subject'),
  { createSubject } = require('../interactors/subject');

exports.addSubject = (req, res, next) => {
  createSubject(mapNewSubject(req.body))
    .then(() => res.status(200).send('Subject created successfully'))
    .catch(next);
};
