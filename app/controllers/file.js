const {
    findAllFiles,
    findAllFilesProfessor,
    findFileByFileNumber,
    getFile,
    deleteFile
  } = require('../interactors/file'),
  { mapFileByFileNumber } = require('../mappers/file'),
  sendEmail = require('../services/mail'),
  { generateRecommendMail } = require('../helpers'),
  logger = require('../logger'),
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

exports.recommend = (req, res, next) =>
  getFile(req.body.fileId)
    .then(file =>
      file && file.dataValues.mail !== 'N/I'
        ? sendEmail(generateRecommendMail(req.body, file.dataValues.mail))
        : res.status(401).send('File or mail does not exits')
    )
    .then(() => {
      logger.info('Email sent to professor');
      return res.status(200).send('Request updated');
    })
    .catch(next);

exports.deleteFile = (req, res, next) =>
  deleteFile(req.params.fileId)
    .then(() => res.status(200).send('File deleted'))
    .catch(next);
