const {
    request: Request,
    file: File,
    subject: Subject,
    sequelize,
    Sequelize,
    Sequelize: { Op }
  } = require('../models'),
  { consulting } = require('../constants/request'),
  { substring } = require('../helpers'),
  { uniq, pickBy } = require('lodash');

exports.findFile = fileNumber =>
  File.findOne({
    where: { fileNumber },
    include: [Request]
  });

exports.createFile = file =>
  File.create(file, {
    include: [Request]
  });

exports.findAllFiles = (
  {
    fkFileIdRes,
    fileNumber,
    name,
    surname,
    mail,
    dni,
    yearNote,
    status,
    field = 'created_at',
    order: orderBy = 'desc'
  },
  offset,
  limit
) => {
  const order = field && orderBy ? [[field, orderBy]] : [];
  const where = pickBy({
    id: fkFileIdRes ? { [Op.in]: fkFileIdRes } : null,
    fileNumber: substring(fileNumber),
    name: substring(name),
    surname: substring(surname),
    mail: substring(mail),
    dni: substring(dni),
    yearNote: substring(yearNote),
    status: { [Op.ne]: 0 }
  });
  if (parseInt(status) === 0) {
    where.status = 0;
  }
  return File.findAndCountAll({
    where,
    ...pickBy({ offset, limit }),
    order
  });
};

exports.findAllFilesProfessor = (professorId, query, offset, limit) =>
  Request.findAll({
    attributes: [['fk_fileid', 'fileId']],
    where: { professorId, equivalence: consulting },
    raw: true
  }).then(fkFileIdRes =>
    fkFileIdRes.length
      ? exports.findAllFiles(
          { ...query, fkFileIdRes: uniq(fkFileIdRes.map(({ fileId }) => fileId)) },
          offset,
          limit
        )
      : { count: 0, rows: [] }
  );

exports.findFileByFileNumber = fileNumber =>
  File.findOne({
    where: { fileNumber },
    include: [
      {
        model: Request,
        include: [{ model: Subject, as: 'originSubjects' }, { model: Subject, as: 'unqSubject' }]
      }
    ]
  });

exports.decrementFileStatus = (id, transaction) =>
  File.decrement('status', { where: { id } }, { transaction });

exports.incrementStatusToFile = (id, transaction) =>
  File.increment('status', { where: { id } }, { transaction });

exports.getFile = id => File.findOne({ where: { id } });

exports.deleteFile = fileId =>
  sequelize.query(
    `
    delete from request_subjects where request_id in (select id from requests where fk_fileid = ${fileId});
    delete from requests where fk_fileid = ${fileId};
    delete from files where id = ${fileId};
`,
    {
      type: Sequelize.QueryTypes.DELETE
    }
  );
