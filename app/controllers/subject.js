const { mapNewSubject } = require('../mappers/subject'),
  {
    createSubject,
    findAndCountAllSubjects,
    getUniversities,
    getCareers,
    getPlanYears,
    getSubject
  } = require('../interactors/subject'),
  { getPageParams } = require('../helpers');

exports.addSubject = (req, res, next) => {
  createSubject(mapNewSubject(req.body))
    .then(subject => res.status(200).send(subject))
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

exports.getUniversities = (req, res, next) => {
  getUniversities()
    .then(universities => res.status(200).send(universities.map(({ university }) => university)))
    .catch(next);
};

exports.getCareers = (req, res, next) => {
  getCareers(req.query)
    .then(careers => res.status(200).send(careers.map(({ career }) => career)))
    .catch(next);
};

exports.getPlanYears = (req, res, next) => {
  getPlanYears(req.query)
    .then(planYears => res.status(200).send(planYears.map(({ year_plan: yearPlan }) => yearPlan)))
    .catch(next);
};

exports.getSubject = (req, res, next) => {
  getSubject(req.query)
    .then(subject =>
      subject
        ? res.status(200).send(subject)
        : res.status(404).send('There is not any subject with those params')
    )
    .catch(next);
};
