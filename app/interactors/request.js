const {
    request: Request,
    request_subject: RequestSubject,
    subject: Subject,
    info_subject: InfoSubject,
    request_info_subject: RequestInfoSubject,
    sequelize,
    Sequelize,
    Sequelize: { Op }
  } = require('../models'),
  { pickBy } = require('lodash'),
  { substring } = require('../helpers'),
  { approved, rejected, withoutEvaluating, consulting } = require('../constants/request');

exports.findRequests = fileId =>
  Request.findAll({
    where: { fk_fileid: fileId },
    include: [
      { model: Subject, as: 'originSubjects' },
      { model: Subject, as: 'unqSubject' },
      { model: InfoSubject, as: 'originSubjectsInfo' }
    ]
  });

exports.updateRequest = (id, { equivalence, observations }, signature, transaction) =>
  Request.update(
    { equivalence, signature, observations: observations || '' },
    { where: { id } },
    { transaction }
  );

exports.getRequest = id =>
  Request.findOne({
    where: { id },
    include: [
      { model: Subject, as: 'originSubjects' },
      { model: Subject, as: 'unqSubject' },
      { model: InfoSubject, as: 'originSubjectsInfo' }
    ]
  });

exports.getSubjectsStepper = ({ id }) =>
  Request.findOne({
    where: { id },
    include: [{ model: Subject, as: 'originSubjects' }]
  });

const generateTotalMatchQuery = (unqSubjectId, fkFileId, universityOrigin, careerOrigin, yearPlanOrigin) => `
  with request_ids_in_match as (
    select distinct(requests.id) from requests, request_subjects, subjects where 
      requests.fk_subjectId = ${unqSubjectId} and 
      requests.fk_fileid != ${fkFileId} and
      request_subjects.request_id = requests.id and 
      request_subjects.subject_id = subjects.id and
      requests.equivalence = '${approved}' and 
      subjects.university = '${universityOrigin}' and subjects.career = '${careerOrigin}' 
      ${yearPlanOrigin ? `and subjects.year_plan = '${yearPlanOrigin}'` : ''}
  ),
  request_match_id as (
    select distinct(requests.id) as id from requests, request_subjects, subjects, request_ids_in_match where
      requests.id = request_ids_in_match.id and
      requests.id not in (    
        select distinct(requests.id) as id from requests, request_subjects, subjects, request_ids_in_match where
      requests.id = request_ids_in_match.id and
      request_subjects.request_id = requests.id and 
      request_subjects.subject_id = subjects.id and 
      (subjects.university != '${universityOrigin}' or subjects.career != '${careerOrigin}' 
      ${yearPlanOrigin ? `or subjects.year_plan != '${yearPlanOrigin}')` : ')'}) and
      request_subjects.request_id = requests.id and 
      request_subjects.subject_id = subjects.id limit 1
  )
    select subjects.* from requests, request_subjects, subjects, request_match_id where
      requests.id = request_match_id.id and
      request_subjects.request_id = requests.id and 
      request_subjects.subject_id = subjects.id
`;

exports.findRequestsTotalMatch = ({
  fk_fileid: fkFileId,
  originSubject: { university: universityOrigin, career: careerOrigin, yearPlan: yearPlanOrigin },
  unqSubject: {
    dataValues: { id: unqSubjectId }
  }
}) =>
  sequelize.query(
    generateTotalMatchQuery(unqSubjectId, fkFileId, universityOrigin, careerOrigin, yearPlanOrigin),
    {
      type: Sequelize.QueryTypes.SELECT
    }
  );

exports.findRequestsMatchWithoutYearPlanOrigin = ({
  fk_fileid: fkFileId,
  originSubject: { university: universityOrigin, career: careerOrigin },
  unqSubject: {
    dataValues: { id: unqSubjectId }
  }
}) =>
  sequelize.query(generateTotalMatchQuery(unqSubjectId, fkFileId, universityOrigin, careerOrigin), {
    type: Sequelize.QueryTypes.SELECT
  });

exports.findRequestsMatch = ({
  fk_fileid: fkFileId,
  originSubject: { university: universityOrigin, career: careerOrigin },
  unqSubject: {
    dataValues: { id: unqSubjectId }
  }
}) =>
  sequelize
    .query(
      `
      select distinct(requests.id) from requests, request_subjects, subjects where 
        requests.fk_subjectId = ${unqSubjectId} and 
        requests.fk_fileid != ${fkFileId} and
        request_subjects.request_id = requests.id and 
        request_subjects.subject_id = subjects.id and
        requests.equivalence = '${rejected}' and 
        subjects.university = '${universityOrigin}' and subjects.career = '${careerOrigin}' limit 40; 
    `,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    )
    .then(ids =>
      ids.length
        ? Request.findAll({
            where: { id: { [Op.in]: ids.map(({ id }) => id) } },
            include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
          })
        : []
    );

exports.findRequestsStepper = fileId =>
  Request.findAll({
    attributes: [['id', 'requestId'], 'equivalence', [Sequelize.col('unqSubject.subject'), 'subjectUnq']],
    where: { fk_fileid: fileId },
    include: [
      { model: Subject, as: 'originSubjects', attributes: ['id'] },
      { model: Subject, as: 'unqSubject', attributes: [] }
    ]
  });

exports.findRequestsStepperProfessor = (fileId, professorId) =>
  Request.findAll({
    attributes: [['id', 'requestId'], 'equivalence', [Sequelize.col('unqSubject.subject'), 'subjectUnq']],
    where: { fk_fileid: fileId, professorId, equivalence: consulting },
    include: [
      { model: Subject, as: 'originSubjects', attributes: ['id'] },
      { model: Subject, as: 'unqSubject', attributes: [] }
    ]
  });

exports.findAllRequestsProfessor = (professorId, fileId) =>
  Request.findAll({
    where: { fk_fileid: fileId, professorId, equivalence: consulting },
    include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
  });

exports.updateConsultEquivalence = (id, { id: professorId }, { message: commentsToProfessor = 'N/I' }) =>
  Request.update({ professorId, equivalence: consulting, commentsToProfessor }, { where: { id } });

exports.findRequestBySubjectUnqId = (fileId, subjectUnqId, transaction) =>
  Request.findOne({ where: { fk_fileid: fileId, fk_subjectid: subjectUnqId } }, { transaction });

exports.updateToWithoutEvaluating = (request, transaction) =>
  Request.update(
    { equivalence: withoutEvaluating, signature: 'N/I' },
    { where: { id: request.id }, returning: true },
    { transaction }
  );

exports.createRequest = (fileId, { type, subjectUnqId }, transaction) =>
  Request.create({ type, fk_fileid: fileId, fk_subjectid: subjectUnqId }, { transaction });

exports.createRequestSubject = (requestSubjects, transaction) =>
  RequestSubject.bulkCreate(requestSubjects, { transaction });

exports.deleteRequest = (requestId, transaction) =>
  RequestSubject.destroy({ where: { requestId } }, { transaction }).then(() =>
    RequestInfoSubject.destroy({ where: { requestId } }, { transaction }).then(() =>
      Request.destroy({ where: { id: requestId } }, { transaction })
    )
  );

exports.findAndCountAllRequests = (
  {
    universityOrigin,
    careerOrigin,
    yearPlanOrigin,
    subjectOrigin,
    careerUnq,
    subjectUnq,
    subjectCoreUnq,
    yearOfEquivalence,
    signature,
    equivalence,
    type
  },
  offset,
  limit
) =>
  Request.findAll({
    attributes: ['id'],
    where: pickBy({
      yearOfEquivalence: substring(yearOfEquivalence),
      signature: substring(signature),
      equivalence: substring(equivalence),
      type
    }),
    include: [
      {
        model: Subject,
        as: 'originSubjects',
        where: pickBy({
          university: substring(universityOrigin),
          career: substring(careerOrigin),
          yearPlan: substring(yearPlanOrigin),
          subject: substring(subjectOrigin)
        })
      },
      {
        model: Subject,
        as: 'unqSubject',
        where: pickBy({
          career: substring(careerUnq),
          subject: substring(subjectUnq),
          subjectCore: substring(subjectCoreUnq)
        })
      }
    ]
  }).then(ids =>
    ids.length
      ? Request.findAndCountAll({
          attributes: ['id'],
          where: { id: { [Op.in]: ids.map(({ id }) => id) } },
          ...pickBy({ offset, limit })
        }).then(({ count, rows: idsRes }) =>
          Request.findAll({
            where: { id: { [Op.in]: idsRes.map(({ id }) => id) } },
            include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
          }).then(requests => ({ count, rows: requests }))
        )
      : { count: 0, rows: [] }
  );

exports.createInfoSubjects = (infoSubjects, transaction) =>
  InfoSubject.bulkCreate(infoSubjects, { transaction });

exports.createRequestSubjectInfo = (requestSubjectsInfo, transaction) =>
  RequestInfoSubject.bulkCreate(requestSubjectsInfo, { transaction });

exports.setForeignKey = (toUpdate, transaction) =>
  sequelize.query(`ALTER TABLE requests ${toUpdate} trigger all;`, {
    type: Sequelize.QueryTypes.SELECT,
    transaction
  });
