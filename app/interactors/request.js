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
