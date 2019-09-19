exports.userExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test@gmail.com',
  password: 'passwordTest1',
  role: 'admin'
};

exports.loginExample = {
  email: 'test@gmail.com',
  password: 'passwordTest1'
};

exports.loginWithAWrongEmail = {
  email: 'wronggmail.com',
  password: 'passwordTest1'
};

exports.loginWithNonExistentEmail = {
  email: 'wrong@gmail.com',
  password: 'passwordTest1'
};

exports.loginWithAInvalidPassword = {
  email: 'test@gmail.com',
  password: 'toSmall'
};

exports.loginWithAWrongPassword = {
  email: 'test@gmail.com',
  password: 'wrongpassword'
};
