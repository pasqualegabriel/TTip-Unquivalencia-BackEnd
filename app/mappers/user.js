const moment = require('moment');

exports.mapUserData = ({ email, name, lastName, role }) => ({
  email,
  name,
  lastName,
  role,
  lastSignInDate: moment()
});
