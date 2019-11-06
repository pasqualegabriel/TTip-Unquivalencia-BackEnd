const userController = require('./controllers/user'),
  fileController = require('./controllers/file'),
  requestController = require('./controllers/request'),
  subjectController = require('./controllers/subject'),
  userValidations = require('./middlewares/user'),
  requestValidations = require('./middlewares/request'),
  { Validator } = require('express-json-validator-middleware'),
  { logInSchema, userSchema, fileSchema, updateUserSchema } = require('./middlewares/schemas');

const { validate } = new Validator({ allErrors: true });

exports.init = app => {
  app.post(
    '/api/v1/request',
    [userValidations.verifyAdminAndUserLogin, validate({ body: fileSchema })],
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
  app.delete(
    '/api/v1/request/:requestId',
    [userValidations.verifyAdminLogin],
    requestController.deleteRequest
  );
  app.get(
    '/api/v1/request/:requestId',
    [userValidations.verifyGetRequestAuthentication],
    requestController.getRequest
  );
  app.get(
    '/api/v1/matchs/requests/:requestId/subject/:subjectId',
    [userValidations.verifyGetRequestAuthentication],
    requestController.getRequestMatchs
  );
  app.get(
    '/api/v1/stepper/requests/:requestId/subject/:subjectId',
    [userValidations.verifyAuthentication],
    requestController.getStepperRequest
  );
  app.post(
    '/api/v1/consult/requests/:requestId/subject/:subjectId',
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
  app.post(
    '/api/v1/update/user',
    [userValidations.verifyAdminLogin, validate({ body: updateUserSchema })],
    userController.updateUser
  );
  app.delete('/api/v1/delete/user/:userId', [userValidations.verifyAdminLogin], userController.deleteUser);
  app.post(
    '/api/v1/password/new',
    [userValidations.verifyAuthentication, userValidations.verifyPassword, userValidations.verifyNewPassword],
    userController.updatePassword
  );
  app.post('/api/v1/subject', [userValidations.verifyAdminLogin], subjectController.addSubject);
  app.get('/api/v1/subjects', [userValidations.verifyAdminLogin], subjectController.getSubjects);
  app.get('/api/v1/universities', [userValidations.verifyAdminLogin], subjectController.getUniversities);
  app.get('/api/v1/careers', [userValidations.verifyAdminLogin], subjectController.getCareers);
  app.get('/api/v1/plan/years', [userValidations.verifyAdminLogin], subjectController.getPlanYears);
  app.get('/api/v1/subject', [userValidations.verifyAdminLogin], subjectController.getSubject);
  app.post('/api/v1/recommend', [userValidations.verifyAdminLogin], fileController.recommend);
  app.delete('/api/v1/file/:fileId', [userValidations.verifyAdminLogin], fileController.deleteFile);
  app.post(
    '/api/v1/duplicate/file/:fileId',
    [userValidations.verifyAdminLogin],
    fileController.duplicateFile
  );
  app.get('/api/v1/requests', [userValidations.verifyAdminAndUserLogin], requestController.getRequests);
};
