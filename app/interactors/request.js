const {
    request: Request,
    request_subject: RequestSubject,
    subject: Subject,
    Sequelize,
    Sequelize: { Op }
  } = require('../models'),
  { approved, rejected, withoutEvaluating, consulting } = require('../constants/request');

exports.findRequests = fileId =>
  Request.findAll({
    where: { fk_fileid: fileId },
    include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
  });

exports.updateRequest = (id, { equivalence, observations }, signature) =>
  Request.update({ equivalence, signature, observations: observations || '-' }, { where: { id } });

exports.getRequest = id =>
  Request.findOne({
    where: { id },
    include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
  });

// eslint-disable-next-line camelcase
exports.getSubjectsStepper = ({ id }, subjectId) =>
  Request.findOne({
    where: { id },
    include: [{ model: Subject, as: 'originSubjects', where: { id: subjectId } }]
  });

exports.getRequestMatch = ({ fk_fileid: fkFileId, subjectUnq }) =>
  Request.findAll({
    raw: true,
    where: { fk_fileid: fkFileId, subjectUnq }
  });

exports.findRequestsTotalMatch = ({
  fk_fileid: fkFileId,
  universityOrigin,
  careerOrigin,
  yearPlanOrigin,
  subjectUnq
}) =>
  Request.findAll({
    where: {
      fk_fileid: { [Op.ne]: fkFileId },
      equivalence: approved
    },
    include: [
      {
        model: Subject,
        as: 'originSubjects',
        where: {
          universityOrigin,
          careerOrigin,
          yearPlanOrigin
        }
      },
      {
        model: Subject,
        as: 'unqSubject',
        where: { subjectUnq }
      }
    ],
    limit: 1
  });

exports.findRequestsMatchWithoutYearPlanOrigin = ({
  fk_fileid: fkFileId,
  universityOrigin,
  careerOrigin,
  subjectUnq
}) =>
  Request.findAll({
    attributes: ['fk_fileid'],
    raw: true,
    where: {
      universityOrigin,
      careerOrigin,
      subjectUnq,
      fk_fileid: { [Op.ne]: fkFileId },
      equivalence: approved
    },
    limit: 1
  }).then(fkFileIdRes =>
    fkFileIdRes.length
      ? Request.findAll({
          raw: true,
          where: {
            fk_fileid: fkFileIdRes[0].fk_fileid,
            subjectUnq,
            equivalence: approved
          }
        })
      : []
  );

exports.findRequestsMatch = ({ fk_fileid: fkFileId, universityOrigin, careerOrigin, subjectUnq }) =>
  Request.findAll({
    raw: true,
    where: {
      universityOrigin,
      careerOrigin,
      subjectUnq,
      fk_fileid: { [Op.ne]: fkFileId },
      equivalence: { [Op.in]: [approved, rejected] }
    },
    limit: 40,
    order: [['fk_fileid', 'asc']]
  });

exports.findRequestsStepper = fileId =>
  Request.findAll({
    attributes: [['id', 'requestId'], 'equivalence', [Sequelize.col('unqSubject.subject'), 'subjectUnq']],
    raw: true,
    where: { fk_fileid: fileId },
    include: [{ model: Subject, as: 'unqSubject', attributes: [] }]
  });

exports.findRequestsStepperProfessor = (fileId, professorId) =>
  Request.findAll({
    attributes: [['id', 'requestId'], 'equivalence', [Sequelize.col('unqSubject.subject'), 'subjectUnq']],
    raw: true,
    where: { fk_fileid: fileId, professorId, equivalence: consulting },
    include: [{ model: Subject, as: 'unqSubject', attributes: [] }]
  });

exports.findAllRequestsProfessor = (professorId, fileId) =>
  Request.findAll({
    raw: true,
    where: { fk_fileid: fileId, professorId, equivalence: consulting },
    include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
  });

exports.updateConsultEquivalence = (id, { id: professorId }, { message: commentsToProfessor = 'N/I' }) =>
  Request.update({ professorId, equivalence: consulting, commentsToProfessor }, { where: { id } });

exports.findRequestBySubjectUnqId = (fileId, subjectUnqId) =>
  Request.findOne({ where: { fk_fileid: fileId, fk_subjectid: subjectUnqId } });

exports.updateToWithoutEvaluating = request =>
  Request.update(
    { equivalence: withoutEvaluating, signature: 'N/I' },
    { where: { id: request.id }, returning: true }
  );

exports.createRequest = (fileId, subjectUnqId) =>
  Request.create({ fk_fileid: fileId, fk_subjectid: subjectUnqId });

exports.createRequestSubject = (requestId, subjectId) => RequestSubject.create({ requestId, subjectId });
