const { should: chaiShould, request, expect } = require('chai'),
  server = require('./../../../app'),
  { factory } = require('factory-girl'),
  {
    userExample,
    professorExample,
    loginExample,
    professorLoginExample,
    loginWithAWrongEmail,
    loginWithNonExistentEmail,
    loginWithAInvalidPassword,
    loginWithAWrongPassword,
    anUserWithoutEmailAndPasswordExample,
    anUserWithAnInvalidEmailExample,
    newUserExample,
    userExamples,
    userExamplesLogin,
    lastNamesTest,
    userExamplesProfessorLogin
  } = require('../../exampleJSONs/user'),
  {
    incorrectPasswordMessage,
    theEmailAlreadyExistsMessage,
    invalidMailMessage,
    permissionDeniedMessage
  } = require('../../../app/errors'),
  mockery = require('mockery'),
  nodemailerMock = require('nodemailer-mock'),
  { PROFESSOR } = require('../../../app/constants/user'),
  config = require('../../../config'),
  should = chaiShould();

describe('/user/session POST', () => {
  beforeEach(() => factory.createMany('user', [userExample, professorExample]));
  it('Should be a successful login', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginExample)
      .then(res => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.user.email.should.be.eq(userExample.email);
      }));
  it('Should throw an error when the body is incomplete', () =>
    request(server)
      .post('/api/v1/user/session')
      .send({})
      .then(error => {
        error.should.have.status(500);
        error.body.length.should.be.equal(2);
      }));
  it("Should throw an error when the user's email does not exist", () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginWithNonExistentEmail)
      .then(error => {
        error.should.have.status(401);
        error.body.length.should.be.equal(1);
      }));
  it('Should throw an error with a wrong email', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginWithAWrongEmail)
      .then(error => {
        error.should.have.status(401);
        error.body.length.should.be.equal(2);
      }));
  it('Should throw an error with a invalid password', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginWithAInvalidPassword)
      .then(error => {
        error.should.have.status(401);
        error.body.length.should.be.equal(1);
      }));
  it('Should throw an error with a wrong password', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginWithAWrongPassword)
      .then(error => {
        error.should.have.status(401);
        error.body[0].should.be.equal(incorrectPasswordMessage);
      }));
});

describe('/user POST', () => {
  beforeEach(() => factory.createMany('user', [userExample, professorExample]));
  before(() => {
    mockery.enable({
      warnOnUnregistered: false
    });
    return mockery.registerMock('nodemailer', nodemailerMock);
  });
  afterEach(() => nodemailerMock.mock.reset());
  after(() => {
    mockery.deregisterAll();
    return mockery.disable();
  });
  it('Should create a new user', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginExample)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .post('/api/v1/new/user')
          .set('authorization', `Bearer ${token}`)
          .send(newUserExample);
      })
      .then(res => {
        res.should.have.status(200);
      }));
  it('Should throw an error with an user without authorization', () =>
    request(server)
      .post('/api/v1/new/user')
      .send(newUserExample)
      .then(err => {
        err.should.have.status(401);
        err.body.length.should.be.eq(1);
      }));
  it('Should throw an error with an user without permissions', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(professorLoginExample)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .post('/api/v1/new/user')
          .set('authorization', `Bearer ${token}`)
          .send(userExample);
      })
      .then(err => {
        err.should.have.status(401);
        err.body.should.be.an('array');
        err.body.length.should.be.eq(1);
        err.body.should.include(permissionDeniedMessage);
      }));
  it('Should throw an error with an user with empty fields', () =>
    request(server)
      .post('/api/v1/new/user')
      .send(anUserWithoutEmailAndPasswordExample)
      .then(err => {
        err.should.have.status(500);
        err.body.length.should.be.eq(2);
      }));
  it("Should throw an error when the user's email already exists", () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginExample)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .post('/api/v1/new/user')
          .set('authorization', `Bearer ${token}`)
          .send(userExample);
      })
      .then(err => {
        err.should.have.status(401);
        err.body.should.be.an('array');
        err.body.length.should.be.eq(1);
        err.body.should.include(theEmailAlreadyExistsMessage);
      }));
  it("Should throw an error when the user's email doesn't belong to email domain", () =>
    request(server)
      .post('/api/v1/user/session')
      .send(loginExample)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .post('/api/v1/new/user')
          .set('authorization', `Bearer ${token}`)
          .send(anUserWithAnInvalidEmailExample);
      })
      .then(err => {
        err.should.have.status(401);
        err.body.should.be.an('array');
        err.body.length.should.be.eq(1);
        err.body.should.include(invalidMailMessage);
      }));
});

describe('/users GET', () => {
  beforeEach(() => factory.createMany('user', userExamples));
  it('Should get all users', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`);
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.body.users).to.have.lengthOf(7);
      }));
  it('Should get three users with an page 1 and limit 3', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`)
          .query({
            page: 1,
            limit: 3
          });
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.body.users).to.have.lengthOf(3);
        expect(res.body.total_pages).to.equal(3);
      }));
  it('Should get one of seven users filtering by name, with the last page and limit 2', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`)
          .query({
            name: 'a',
            page: 4,
            limit: 2
          });
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.body.users).to.have.lengthOf(1);
        expect(res.body.total_pages).to.equal(4);
      }));
  it('Should get two professors filtering by role', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`)
          .query({
            role: PROFESSOR,
            page: 1,
            limit: 5
          });
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.body.users).to.have.lengthOf(2);
        res.body.users.forEach(user => expect(user.role).to.equal(PROFESSOR));
      }));
  it('Should get all users ordering by last name asc', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`)
          .query({
            field: 'lastName',
            order: 'asc',
            page: 1,
            limit: 10
          });
      })
      .then(res => {
        res.should.have.status(200);
        res.body.users.forEach((user, index) => expect(user.lastName).to.equal(lastNamesTest.charAt(index)));
      }));
  it('Should get all users ordering by last name desc', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`)
          .query({
            field: 'lastName',
            order: 'desc',
            page: 1,
            limit: 10
          });
      })
      .then(res => {
        res.should.have.status(200);
        const lastNamesTestReverse = lastNamesTest
          .split('')
          .reverse()
          .join('');
        res.body.users.forEach((user, index) =>
          expect(user.lastName).to.equal(lastNamesTestReverse.charAt(index))
        );
      }));
  it('Should throw an error when a professor try to get users', () =>
    request(server)
      .post('/api/v1/user/session')
      .send(userExamplesProfessorLogin)
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`);
      })
      .then(res => {
        res.should.have.status(401);
      }));
});

describe('Disable all sessions', () => {
  it('Should successfully POST to /api/v1/user/invalidate/all/sessions with a valid token', () =>
    factory
      .create('user', userExample)
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .post('/api/v1/user/invalidate/all/sessions')
          .set('authorization', `Bearer ${token}`)
          .send({});
      })
      .then(res => {
        res.should.have.status(200);
      }));
  it('Should successfully GET users with a token created after of disable all sessions', () =>
    factory
      .create('user', userExample)
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resToken1 =>
        request(server)
          .post('/api/v1/user/invalidate/all/sessions')
          .set('authorization', `Bearer ${resToken1.body.token}`)
          .send({})
      )
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resTokenValid =>
        request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${resTokenValid.body.token}`)
      )
      .then(res => {
        res.should.have.status(200);
      }));
  it('Should throw an error when sending GET users with a token that was disabled', () =>
    factory
      .create('user', userExample)
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resToken1 =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
          .then(resToken2 =>
            request(server)
              .post('/api/v1/user/invalidate/all/sessions')
              .set('authorization', `Bearer ${resToken1.body.token}`)
              .send({})
              .then(() =>
                request(server)
                  .get('/api/v1/users')
                  .set('authorization', `Bearer ${resToken2.body.token}`)
                  .then(res => {
                    res.should.have.status(401);
                  })
              )
          )
      ));
  it('Should throw an error when sending to POST to /api/v1/user/invalidate/all/sessions when an user is not logged', () =>
    request(server)
      .post('/api/v1/user/invalidate/all/sessions')
      .send({})
      .then(err => {
        err.should.have.status(401);
      }));
});
describe('Token Expiration', () => {
  it('Should successfully GET users with a token that has not expired', () => {
    config.common.session.invalidationTimeInMinutes = 10;
    return factory
      .create('user', userExample)
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resToken => {
        const token = resToken.body.token;
        return request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${token}`);
      })
      .then(res => {
        res.should.have.status(200);
        res.body.users.should.be.an('array');
        res.body.users.length.should.be.eq(1);
      });
  });
  it('Should throw an error when sending to GET users with a token that has expired', () => {
    config.common.session.invalidationTimeInMinutes = 0;
    return factory
      .create('user', userExample)
      .then(() =>
        request(server)
          .post('/api/v1/user/session')
          .send(loginExample)
      )
      .then(resToken =>
        request(server)
          .get('/api/v1/users')
          .set('authorization', `Bearer ${resToken.body.token}`)
      )
      .then(res => {
        res.should.have.status(401);
      });
  });
});
