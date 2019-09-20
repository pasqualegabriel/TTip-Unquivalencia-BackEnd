const chai = require('chai'),
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
    anUserWithAnInvalidPasswordExample,
    anUserWithAnInvalidEmailExample,
    newUserExample
  } = require('../../exampleJSONs/user'),
  {
    incorrectPasswordMessage,
    theEmailAlreadyExistsMessage,
    invalidPasswordMessage,
    invalidMailMessage,
    permissionDeniedMessage
  } = require('../../../app/errors'),
  should = chai.should();

describe('user', () => {
  describe('/user/session POST', () => {
    beforeEach(() => factory.createMany('user', [userExample, professorExample]));
    it('Should be a successful login', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          res.body.user.email.should.be.eq(userExample.email);
        }));
    it('Should throw an error when the body is incomplete', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send({})
        .then(error => {
          error.should.have.status(500);
          error.body.length.should.be.equal(2);
        }));
    it("Should throw an error when the user's email does not exist", () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginWithNonExistentEmail)
        .then(error => {
          error.should.have.status(401);
          error.body.length.should.be.equal(1);
        }));
    it('Should throw an error with a wrong email', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginWithAWrongEmail)
        .then(error => {
          error.should.have.status(401);
          error.body.length.should.be.equal(2);
        }));
    it('Should throw an error with a invalid password', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginWithAInvalidPassword)
        .then(error => {
          error.should.have.status(401);
          error.body.length.should.be.equal(1);
        }));
    it('Should throw an error with a wrong password', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginWithAWrongPassword)
        .then(error => {
          error.should.have.status(401);
          error.body[0].should.be.equal(incorrectPasswordMessage);
        }));
  });
  describe('/user POST', () => {
    beforeEach(() => factory.createMany('user', [userExample, professorExample]));
    it('Should create a new user', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(resToken => {
          const token = resToken.body.token;
          return chai
            .request(server)
            .post('/api/v1/new/user')
            .set('authorization', `Bearer ${token}`)
            .send(newUserExample);
        })
        .then(res => {
          res.should.have.status(200);
        }));
    it('Should throw an error with an user without authorization', () =>
      chai
        .request(server)
        .post('/api/v1/new/user')
        .send(newUserExample)
        .then(err => {
          err.should.have.status(401);
          err.body.length.should.be.eq(1);
        }));
    it('Should throw an error with an user without permissions', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(professorLoginExample)
        .then(resToken => {
          const token = resToken.body.token;
          return chai
            .request(server)
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
      chai
        .request(server)
        .post('/api/v1/new/user')
        .send(anUserWithoutEmailAndPasswordExample)
        .then(err => {
          err.should.have.status(500);
          err.body.length.should.be.eq(3);
        }));
    it("Should throw an error when the user's email already exists", () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(resToken => {
          const token = resToken.body.token;
          return chai
            .request(server)
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
    it("Should throw an error when the user's password is invalid", () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(resToken => {
          const token = resToken.body.token;
          return chai
            .request(server)
            .post('/api/v1/new/user')
            .set('authorization', `Bearer ${token}`)
            .send(anUserWithAnInvalidPasswordExample);
        })
        .then(err => {
          err.should.have.status(401);
          err.body.should.be.an('array');
          err.body.length.should.be.eq(1);
          err.body.should.include(invalidPasswordMessage);
        }));
    it("Should throw an error when the user's email doesn't belong to email domain", () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(resToken => {
          const token = resToken.body.token;
          return chai
            .request(server)
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
});
