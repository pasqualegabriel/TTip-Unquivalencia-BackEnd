const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.invalidMailMessage = 'Invalid Mail';
exports.invalidPasswordMessage = 'Invalid Password';
exports.nonExistentMailMessage = 'Non existent mail';
exports.incorrectPasswordMessage = 'Incorrect Password';
