const { request: Request, file: File } = require('../models'),
  errors = require('../errors');

exports.createRequestToFile = ({ fileNumber, mail, name, surname }, fileId) =>
  File.create({
    fk_fileid: fileId,
    fileNumber,
    mail,
    name,
    surname
  }).catch(err => Promise.reject(errors.databaseError(err.message)));
