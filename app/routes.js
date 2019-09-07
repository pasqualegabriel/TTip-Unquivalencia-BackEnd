const userController = require('./controllers/user'),
  requestController = require('./controllers/request');

exports.init = app => {
  app.get('/users', [], userController.getUsers);
  app.post('/v1/request', [], requestController.addRequest);
};
