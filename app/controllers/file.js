const {
    findAllFiles,
    findAllFilesProfessor,
    findFileByFileNumber,
    getFile,
    deleteFile,
    createFile,
    findFile,
    findFileLetter
  } = require('../interactors/file'),
  { findRequests } = require('../interactors/request'),
  { mapFileByFileNumber, mapNewFile, mapLetter } = require('../mappers/file'),
  sendEmail = require('../services/mail'),
  { getPageParams, generateRecommendMail } = require('../helpers'),
  { sequelize } = require('../models'),
  { createRequestsToFile } = require('./request'),
  logger = require('../logger'),
  { PROFESSOR } = require('../constants/user');

const getFiles = ({ id, role }, query, offset, limit) =>
  role === PROFESSOR ? findAllFilesProfessor(id, query, offset, limit) : findAllFiles(query, offset, limit);

exports.getAllFiles = (req, res, next) => {
  const { limit, offset } = getPageParams(req.query);
  return getFiles(res.locals.user, req.query, offset, limit)
    .then(({ count, rows: files }) =>
      res.status(200).send({
        files,
        total_pages: limit ? Math.ceil(count / limit) : 1
      })
    )
    .catch(next);
};

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

exports.duplicateFile = async (req, res, next) => {
  try {
    const { dataValues: file } = await getFile(req.params.fileId);
    file.fileNumber = `${file.fileNumber}R`;
    await createFile(mapNewFile(file));
    const { dataValues: newFile } = await findFile(file.fileNumber);
    const requests = await findRequests(file.id);
    const transaction = await sequelize.transaction();
    for (const request of requests) {
      // eslint-disable-next-line no-await-in-loop
      await createRequestsToFile(
        newFile,
        {
          fileNumber: newFile.fileNumber,
          subjectOriginIds: request.dataValues.originSubjects.map(({ dataValues: { id } }) => id),
          subjectUnqId: request.dataValues.unqSubject.dataValues.id
        },
        transaction
      );
    }
    await transaction.commit();
    return res.status(200).send('File duplicated');
  } catch (error) {
    return next(error);
  }
};

exports.getLetter = (req, res, next) =>
  findFileLetter(req.params.fileId)
    .then(file => res.status(200).send(mapLetter(file)))
    .catch(next);
