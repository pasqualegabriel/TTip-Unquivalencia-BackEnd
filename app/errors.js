const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.invalidMailMessage = 'Email invalido';
exports.invalidPasswordMessage = 'Password invalido';
exports.nonExistentMailMessage = 'Email inexistente';
exports.incorrectPasswordMessage = 'Password incorrecto';
exports.theEmailAlreadyExistsMessage = 'Ya existe el email';
exports.permissionDeniedMessage = 'Permiso denegado';
exports.youAreNotLoggedInMessage = 'No estas logiado';
exports.sessionExpiredMessage = 'Session expired';
