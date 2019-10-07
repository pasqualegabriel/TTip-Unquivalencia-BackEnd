const {
    request: Request,
    Sequelize: { Op }
  } = require('../models'),
  { uniq } = require('lodash');

exports.createRequestToFile = requests => Request.bulkCreate(requests);

exports.findRequests = fileId => Request.findAll({ raw: true, where: { fk_fileid: fileId } });

exports.updateRequest = (id, { equivalence }) => Request.update({ equivalence }, { where: { id } });

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
  subjectOrigin,
  yearPlanOrigin,
  subjectUnq
}) =>
  Request.findAll({
    attributes: ['fk_fileid'],
    raw: true,
    where: {
      universityOrigin,
      careerOrigin,
      subjectOrigin,
      yearPlanOrigin,
      subjectUnq,
      fk_fileid: { [Op.ne]: fkFileId },
      equivalence: { [Op.in]: ['APROBADA', 'RECHAZADA'] }
    },
    limit: 5
  }).then(fkFileIdsRes => {
    const fkFileIds = fkFileIdsRes.length ? uniq(fkFileIdsRes.map(fks => fks.fk_fileid)) : [fkFileIdsRes];
    return Request.findAll({
      raw: true,
      where: {
        fk_fileid: { [Op.in]: fkFileIds },
        subjectUnq,
        equivalence: { [Op.in]: ['APROBADA', 'RECHAZADA'] }
      },
      order: [['fk_fileid', 'asc']]
    });
  });

exports.findRequestsMatch = ({
  fk_fileid: fkFileId,
  universityOrigin,
  careerOrigin,
  subjectOrigin,
  subjectUnq
}) =>
  Request.findAll({
    attributes: ['fk_fileid'],
    raw: true,
    where: {
      universityOrigin,
      careerOrigin,
      subjectOrigin,
      subjectUnq,
      fk_fileid: { [Op.ne]: fkFileId },
      equivalence: { [Op.in]: ['APROBADA', 'RECHAZADA'] }
    },
    limit: 15
  }).then(fkFileIdsRes => {
    const fkFileIds = fkFileIdsRes.length ? uniq(fkFileIdsRes.map(fks => fks.fk_fileid)) : [fkFileIdsRes];
    return Request.findAll({
      raw: true,
      where: {
        fk_fileid: { [Op.in]: fkFileIds },
        subjectUnq,
        equivalence: { [Op.in]: ['APROBADA', 'RECHAZADA'] }
      },
      order: [['fk_fileid', 'asc']]
    });
  });
