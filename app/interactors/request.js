const {
    request: Request,
    Sequelize: { Op }
  } = require('../models'),
  { approved, rejected, withoutEvaluating, consulting } = require('../constants/request');

exports.createRequestToFile = requests => Request.bulkCreate(requests);

exports.findRequests = fileId => Request.findAll({ raw: true, where: { fk_fileid: fileId } });

exports.updateRequestsWithoutEvaluating = (fkFileId, subjectsUnq) =>
  Request.update(
    { equivalence: withoutEvaluating, signature: 'N/I' },
    { where: { fk_fileid: fkFileId, subjectUnq: { [Op.in]: subjectsUnq } } }
  );

exports.updateRequest = ({ fk_fileid: fdFileId, subjectUnq }, { equivalence, observations }, signature) =>
  Request.update(
    { equivalence, signature, observations: observations || '-' },
    { where: { fk_fileid: fdFileId, subjectUnq } }
  );

exports.getRequest = id => Request.findByPk(id);

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
    attributes: ['fk_fileid'],
    raw: true,
    where: {
      universityOrigin,
      careerOrigin,
      yearPlanOrigin,
      subjectUnq,
      fk_fileid: { [Op.ne]: parseInt(fkFileId) },
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
    attributes: [
      ['id', 'requestId'],
      'subjectOrigin',
      'subjectUnq',
      'equivalence',
      'courseMode',
      'subjectOriginWeeklyHours',
      'subjectOriginTotalHours',
      'yearPlanOrigin',
      'credits'
    ],
    raw: true,
    where: { fk_fileid: fileId }
  });

exports.findRequestsStepperProfessor = (fileId, professorId) =>
  Request.findAll({
    attributes: [
      ['id', 'requestId'],
      'subjectOrigin',
      'subjectUnq',
      'equivalence',
      'courseMode',
      'subjectOriginWeeklyHours',
      'subjectOriginTotalHours',
      'yearPlanOrigin',
      'credits'
    ],
    raw: true,
    where: { fk_fileid: fileId, professorId, equivalence: consulting }
  });

exports.findAllRequestsProfessor = (professorId, fileId) =>
  Request.findAll({
    raw: true,
    where: { fk_fileid: fileId, professorId }
  });
