const { findAllFiles } = require('../interactors/file');

exports.getAllFiles = (_, res, next) =>
  findAllFiles()
    .then(files => res.status(200).send(files))
    .catch(next);
