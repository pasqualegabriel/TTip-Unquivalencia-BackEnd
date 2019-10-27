/* eslint-disable no-buffer-constructor */
const { findAllFiles, findAllFilesProfessor, findFileByFileNumber } = require('../interactors/file'),
  { mapFileByFileNumber } = require('../mappers/file'),
  { PROFESSOR } = require('../constants/user'),
  Nuxeo = require('nuxeo');

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

exports.pdf = (req, res, next) => {
  const nuxeo = new Nuxeo({
    baseURL: 'http://localhost:8080/nuxeo',
    auth: {
      baseURL: 'http://localhost:8080/nuxeo',
      method: 'basic',
      username: 'Administrator',
      password: 'Administrator'
    }
  });
  const batch = nuxeo.batchUpload();
  const nuxeoBlob = new Nuxeo.Blob({ content: 'pdfBase64', name: 'foo3' });
  return batch
    .upload(nuxeoBlob)
    .then(() => res.status(200).send('pdf saved'))
    .catch(next);
};
