const userController = require('./controllers/user'),
  fileController = require('./controllers/file'),
  requestController = require('./controllers/request');

exports.init = app => {
  app.get('/users', [], userController.getUsers);
  app.post('/api/v1/request', [], requestController.addRequest);
  app.get('/api/v1/files', [], fileController.getAllFiles);
  app.get('/api/v1/requests/:fileId', [], requestController.getRequestsByFileId);
};
