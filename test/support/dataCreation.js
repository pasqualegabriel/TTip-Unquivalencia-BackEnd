const { user: User } = require('../../app/models'),
  { factory } = require('factory-girl'),
  { roles } = require('../../app/constants/user');

factory.define('user', User, {
  name: factory.chance('string'),
  lastName: factory.chance('string'),
  email: factory.chance('string'),
  password: factory.chance('string'),
  role: factory.chance('pickone', roles)
});
