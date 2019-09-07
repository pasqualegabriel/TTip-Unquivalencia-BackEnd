const { request: Request, file: File } = require('../models');

exports.findFile = fileNumber => File.findOne({ where: { fileNumber } });

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
  );

exports.findAllFiles = () => File.findAll({ include: [{ model: Request, attributes: ['equivalence'] }] });
