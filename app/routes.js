const userController = require('./controllers/user'),
  fileController = require('./controllers/file'),
  requestController = require('./controllers/request'),
  userValidations = require('./middlewares/user'),
  fileValidations = require('./middlewares/file'),
  requestValidations = require('./middlewares/request'),
  { Validator } = require('express-json-validator-middleware'),
  { logInSchema, userSchema, fileSchema } = require('./middlewares/schemas');

const { validate } = new Validator({ allErrors: true });

exports.init = app => {
  app.post(
    '/api/v1/request',
    [userValidations.verifyAdminAndUserLogin, validate({ body: fileSchema }), fileValidations.verifyRequests],
    requestController.addRequest
  );
  app.get('/api/v1/files', [userValidations.verifyAuthentication], fileController.getAllFiles);
  app.get('/api/v1/file', [userValidations.verifyAdminAndUserLogin], fileController.getFileByFileNumber);
  app.get(
    '/api/v1/requests/:fileId',
    [userValidations.verifyAuthentication],
    requestController.getRequestsByFileId
  );
  app.post(
    '/api/v1/request/:requestId',
    [userValidations.verifyUpdateEquivalenceAuthentication, requestValidations.verifyEquivalence],
    requestController.updateEquivalence
  );
  app.get(
    '/api/v1/request/:requestId',
    [userValidations.verifyGetRequestAuthentication],
    requestController.getRequest
  );
  app.get(
    '/api/v1/matchs/requests/:requestId',
    [userValidations.verifyGetRequestAuthentication],
    requestController.getRequestMatchs
  );
  app.get(
    '/api/v1/stepper/requests/:requestId',
    [userValidations.verifyAuthentication],
    requestController.getStepperRequest
  );
  app.post(
    '/api/v1/consult/requests/:requestId',
    [userValidations.verifyAdminLogin, userValidations.validateProfessor, requestValidations.validateRequest],
    requestController.consultEquivalence
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
  app.post('/api/v1/nuxeo', fileController.pdf);
};
