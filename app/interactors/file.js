const { request: Request, file: File } = require('../models');

exports.findFile = fileNumber => File.findOne({ where: { fileNumber } });

exports.createFile = file =>
  File.create(file, {
    include: [Request]
  });

exports.findAllFiles = () => File.findAll({ include: [{ model: Request, attributes: ['equivalence'] }] });
