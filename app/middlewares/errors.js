const errors = require('../errors'),
  logger = require('../logger'),
  { ValidationError } = require('express-json-validator-middleware');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error instanceof ValidationError)
    return res.status(DEFAULT_STATUS_CODE).send(error.validationErrors.body);
  if (error.internalCode) {
    return res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    logger.error(error);
    return res
      .status(DEFAULT_STATUS_CODE)
      .send({ message: error.message, internal_code: error.internalCode });
  }
};
