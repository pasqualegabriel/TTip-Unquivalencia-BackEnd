const { request: Request } = require('../models');

exports.createRequestToFile = requests => Request.bulkCreate(requests);

exports.findRequests = fileId => Request.findAll({ raw: true, where: { fk_fileid: fileId } });

exports.updateRequest = (id, { equivalence }) => Request.update({ equivalence }, { where: { id } });

exports.getRequest = id => Request.findByPk(id);
