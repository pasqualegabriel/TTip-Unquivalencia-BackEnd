const {
    request: Request,
    Sequelize: { Op }
  } = require('../models'),
  { approved, rejected } = require('../constants/request');

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
