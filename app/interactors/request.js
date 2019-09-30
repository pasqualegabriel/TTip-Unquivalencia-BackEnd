const { request: Request } = require('../models');

exports.createRequestToFile = (
  { fileNumber, universityOrigin, subjectOrigin, subjectUnq, equivalence, year },
  fileId
) =>
  Request.create({
    fk_fileid: fileId,
    fileNumber,
    universityOrigin,
    subjectOrigin,
    subjectUnq,
    equivalence,
    year
  });

exports.findRequests = fileId => Request.findAll({ raw: true, where: { fk_fileid: fileId } });

exports.updateRequest = (id, { equivalence }) => Request.update({ equivalence }, { where: { id } });

exports.getRequest = id => Request.findByPk(id);
