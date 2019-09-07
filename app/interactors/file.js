const { request: Request, file: File } = require('../models'),
  errors = require('../errors');

exports.findFile = fileNumber =>
  File.findOne({ where: { fileNumber } }).catch(err => Promise.reject(errors.databaseError(err.message)));

exports.createFile = ({
  fileNumber,
  univesityOrigin,
  subjectOrigin,
  subjectUnq,
  equivalence,
  year,
  mail,
  name,
  surname
}) =>
  File.create(
    {
      fileNumber,
      mail,
      name,
      surname,
      requests: [
        {
          fileNumber,
          univesityOrigin,
          subjectOrigin,
          subjectUnq,
          equivalence,
          year
        }
      ]
    },
    {
      include: [Request]
    }
  ).catch(err => Promise.reject(errors.databaseError(err.message)));
