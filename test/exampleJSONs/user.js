const { ADMIN, USER, PROFESSOR } = require('../../app/constants/user');

exports.userExample = {
  name: 'FirstName',
  lastName: 'LastName',
  email: 'test@gmail.com',
  password: 'passwordTest1',
  role: ADMIN
};

exports.professorExample = {
  name: 'user',
  lastName: 'userName',
  email: 'user@gmail.com',
  password: 'passwordTest1',
  role: USER
};

exports.newUserExample = {
  name: 'FirstName2',
  lastName: 'LastName2',
  email: 'test2@mail.com',
  role: USER
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
  role: USER
};

exports.userExamples = [
  {
    name: 'Gabi',
    lastName: 'a',
    email: 'gabi@gmail.com',
    role: ADMIN
  },
  {
    name: 'Gabriel',
    lastName: 'b',
    email: 'gabriel@gmail.com',
    role: USER
  },
  {
    name: 'Cami',
    lastName: 'c',
    email: 'cami@gmail.com',
    role: ADMIN
  },
  {
    name: 'Camila',
    lastName: 'd',
    email: 'camila@gmail.com',
    role: USER
  },
  {
    name: 'Nahu',
    lastName: 'e',
    email: 'nahu@gmail.com',
    role: PROFESSOR
  },
  {
    name: 'Nahuel',
    lastName: 'f',
    email: 'nahuel@gmail.com',
    role: PROFESSOR,
    password: 'passwordTest'
  },
  {
    name: 'Pepita',
    lastName: 'g',
    email: 'pepita@gmail.com',
    role: ADMIN,
    password: 'passwordTest'
  }
];

exports.userExamplesLogin = {
  email: 'pepita@gmail.com',
  password: 'passwordTest'
};

exports.userExamplesProfessorLogin = {
  email: 'nahuel@gmail.com',
  password: 'passwordTest'
};

exports.lastNamesTest = 'abcdefg';
