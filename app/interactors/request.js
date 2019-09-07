const { request: Request } = require('../models');

exports.createRequestToFile = (
  { fileNumber, univesityOrigin, subjectOrigin, subjectUnq, equivalence, year },
  fileId
) =>
  Request.create({
    fk_fileid: fileId,
    fileNumber,
    univesityOrigin,
    subjectOrigin,
    subjectUnq,
    equivalence,
    year
  });

exports.findRequests = fileId => Request.findAll({ raw: true, where: { fk_fileid: fileId } });
