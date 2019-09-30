const { request: Request, file: File } = require('../models');

exports.findFile = fileNumber => File.findOne({ where: { fileNumber } });

exports.createFile = ({
  fileNumber,
  universityOrigin,
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
          universityOrigin,
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
