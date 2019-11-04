const {
    request: Request,
    file: File,
    subject: Subject,
    Sequelize: { Op }
  } = require('../models'),
  { consulting } = require('../constants/request'),
  { uniq } = require('lodash');

exports.findFile = fileNumber =>
  File.findOne({
    where: { fileNumber },
    include: [Request]
  });

exports.createFile = file =>
  File.create(file, {
    include: [Request]
  });

exports.findAllFiles = () => File.findAll({ raw: true });

exports.findAllFilesProfessor = professorId =>
  Request.findAll({
    attributes: [['fk_fileid', 'fileId']],
    where: { professorId, equivalence: consulting },
    raw: true
  }).then(fkFileIdRes =>
    fkFileIdRes.length
      ? File.findAll({
          raw: true,
          where: {
            id: { [Op.in]: uniq(fkFileIdRes.map(({ fileId }) => fileId)) }
          }
        })
      : []
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

exports.decrementFileStatus = id => File.decrement('status', { where: { id } });

exports.incrementStatusToFile = (id, transaction) =>
  File.increment('status', { where: { id } }, { transaction });
