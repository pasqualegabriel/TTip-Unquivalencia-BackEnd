const { User } = require('../../app/models'),
  { factory } = require('factory-girl');

factory.define('user', User, {
  name: factory.chance('string'),
  lastName: factory.chance('string'),
  email: factory.chance('string'),
  password: factory.chance('string')
});
