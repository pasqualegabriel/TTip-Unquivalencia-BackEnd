const {
  request: Request,
  file: File,
  Sequelize: { Op }
} = require('../models');
const { approved, rejected } = require('../constants/request');

exports.findFile = fileNumber =>
  File.findOne({
    where: { fileNumber },
    include: [
      {
        model: Request,
        attributes: ['subjectUnq'],
        where: { equivalence: { [Op.notIn]: [approved, rejected] } }
      }
    ]
  });

exports.createFile = file =>
  File.create(file, {
    include: [Request]
  });

exports.findAllFiles = () => File.findAll();

exports.findFileByFileNumber = fileNumber =>
  File.findOne({ where: { fileNumber }, include: [{ model: Request, limit: 1 }] });

exports.updateFile = (file, id) => File.update(file, { where: { id } });

exports.decrementFileStatus = id => File.decrement('status', { where: { id } });
