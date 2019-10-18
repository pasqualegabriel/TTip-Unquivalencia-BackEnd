const {
    request: Request,
    file: File,
    Sequelize: { Op }
  } = require('../models'),
  { approved, rejected, consulting } = require('../constants/request'),
  { uniq } = require('lodash');

exports.findFile = fileNumber =>
  File.findOne({
    where: { fileNumber },
    include: [
      {
        model: Request,
        attributes: ['subjectUnq', 'equivalence'],
        where: { equivalence: { [Op.notIn]: [approved, rejected] } }
      }
    ]
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
  File.findOne({ where: { fileNumber }, include: [{ model: Request, limit: 1 }] });

exports.updateFile = (file, id) => File.update(file, { where: { id } });

exports.decrementFileStatus = id => File.decrement('status', { where: { id } });
