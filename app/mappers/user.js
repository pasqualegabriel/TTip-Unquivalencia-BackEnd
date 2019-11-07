const moment = require('moment'),
  { pickBy } = require('lodash');

exports.mapUserData = ({ email, name, lastName, role }) => ({
  email,
  name,
  lastName,
  role,
  lastSignInDate: moment()
});

exports.mapUpdateUser = ({ email, name, lastName, role }) =>
  pickBy({
    email,
    name,
    lastName,
    role
  });

exports.mapEmails = mails => mails.map(({ email }) => email);
