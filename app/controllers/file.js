const { findAllFiles, findAllFilesProfessor, findFileByFileNumber } = require('../interactors/file'),
  { mapFileByFileNumber } = require('../mappers/file'),
  { PROFESSOR } = require('../constants/user');

const getFiles = ({ id, role }) => (role === PROFESSOR ? findAllFilesProfessor(id) : findAllFiles());

exports.getAllFiles = (_, res, next) =>
  getFiles(res.locals.user)
    .then(files => res.status(200).send(files))
    .catch(next);

exports.getFileByFileNumber = (req, res, next) =>
  findFileByFileNumber(req.query.fileNumber)
    .then(file =>
      file
        ? res.status(200).send(mapFileByFileNumber(file))
        : res.status(500).send(`Does not exist any file with file number ${req.query.fileNumber}`)
    )
    .catch(next);
