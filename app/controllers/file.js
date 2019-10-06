const { findAllFiles, findFileByFileNumber } = require('../interactors/file');

exports.getAllFiles = (_, res, next) =>
  findAllFiles()
    .then(files => res.status(200).send(files))
    .catch(next);

exports.getFileByFileNumber = (req, res, next) =>
  findFileByFileNumber(req.query.fileNumber)
    .then(file =>
      file
        ? res.status(200).send(file)
        : res.status(500).send(`Does not exist any file with file number ${req.query.fileNumber}`)
    )
    .catch(next);
