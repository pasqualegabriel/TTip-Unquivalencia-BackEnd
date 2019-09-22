exports.userExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test@gmail.com',
  password: 'passwordTest1',
  role: 'admin'
};

exports.professorExample = {
  name: 'user',
  lastName: 'userName',
  email: 'user@gmail.com',
  password: 'passwordTest1',
  role: 'user'
};

exports.newUserExample = {
  name: 'FirstName2',
  lastName: 'LastName2',
  email: 'test2@mail.com',
  role: 'user'
};

exports.loginExample = {
  email: 'test@gmail.com',
  password: 'passwordTest1'
};

exports.professorLoginExample = {
  email: 'user@gmail.com',
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
  password: 'tooSmall'
};

exports.loginWithAWrongPassword = {
  email: 'test@gmail.com',
  password: 'wrongpassword'
};

exports.anUserWithoutEmailAndPasswordExample = {
  name: 'FirstName',
  lastName: 'LastName'
};

exports.anUserWithAnInvalidEmailExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test_invalid_email.com',
  password: 'passwordTest1',
  role: 'user'
};
