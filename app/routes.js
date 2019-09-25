const userController = require('./controllers/user'),
  fileController = require('./controllers/file'),
  requestController = require('./controllers/request'),
  userValidations = require('./middlewares/user'),
  { Validator } = require('express-json-validator-middleware'),
  { logInSchema, userSchema } = require('./middlewares/schemas');

const { validate } = new Validator({ allErrors: true });

exports.init = app => {
  app.post('/api/v1/request', [], requestController.addRequest);
  app.get('/api/v1/files', [], fileController.getAllFiles);
  app.get('/api/v1/requests/:fileId', [], requestController.getRequestsByFileId);
  app.post('/api/v1/request/:requestId', [], requestController.updateEquivalence);
  app.get('/api/v1/request/:requestId', [], requestController.getRequest);
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
