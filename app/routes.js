const userController = require('./controllers/user'),
  fileController = require('./controllers/file'),
  requestController = require('./controllers/request'),
  userValidations = require('./middlewares/user'),
  fileValidations = require('./middlewares/file'),
  { Validator } = require('express-json-validator-middleware'),
  { logInSchema, userSchema, fileSchema } = require('./middlewares/schemas');

const { validate } = new Validator({ allErrors: true });

exports.init = app => {
  app.post(
    '/api/v1/request',
    [userValidations.verifyAdminAndUserLogin, validate({ body: fileSchema }), fileValidations.verifyRequests],
    requestController.addRequest
  );
  app.get('/api/v1/files', [userValidations.verifyAdminAndUserLogin], fileController.getAllFiles);
  app.get('/api/v1/file', [userValidations.verifyAdminAndUserLogin], fileController.getFileByFileNumber);
  app.get(
    '/api/v1/requests/:fileId',
    [userValidations.verifyAdminAndUserLogin],
    requestController.getRequestsByFileId
  );
  app.post(
    '/api/v1/request/:requestId',
    [userValidations.verifyAdminLogin],
    requestController.updateEquivalence
  );
  app.get(
    '/api/v1/request/:requestId',
    [userValidations.verifyAdminAndUserLogin],
    requestController.getRequest
  );
  app.get(
    '/api/v1/matchs/requests/:requestId',
    [userValidations.verifyAdminAndUserLogin],
    requestController.getRequestMatchs
  );
  app.post(
    '/api/v1/user/session',
    [validate({ body: logInSchema }), userValidations.validateLogin, userValidations.verifyPassword],
    userController.signIn
  );
  app.post(
    '/api/v1/new/user',
    [validate({ body: userSchema }), userValidations.verifyAdminLogin, userValidations.validateNewUser],
    userController.signUp
  );
  app.get('/api/v1/users', [userValidations.verifyAdminAndUserLogin], userController.users);
  app.post(
    '/api/v1/user/invalidate/all/sessions',
    [userValidations.verifyAuthentication],
    userController.invalidateSessions
  );
};
