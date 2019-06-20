const userController = require('./controllers/user');

exports.init = app => {
  app.get('/users', [], userController.getUsers);
};
