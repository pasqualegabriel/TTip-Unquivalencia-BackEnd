exports.userExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test@wolox.com.ar',
  password: 'passwordTest1'
};

exports.loginExample = {
  email: 'test@wolox.com.ar',
  password: 'passwordTest1'
};

exports.anUserWithoutEmailAndPasswordExample = {
  name: 'FirstName',
  lastName: 'LastName'
};

exports.anUserWithAnInvalidPasswordExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test@wolox.com.ar',
  password: 'invalid'
};

exports.anUserWithAnInvalidEmailExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test_invalid_email.com',
  password: 'passwordTest1'
};

exports.otherUserExample = {
  name: 'FirstName2',
  lastName: 'LastName2',
  email: 'test2@wolox.com.ar',
  password: 'passwordTest2'
};
