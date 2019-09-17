const chai = require('chai'),
  server = require('./../../../app'),
  { factory } = require('factory-girl'),
  {
    userExample,
    loginExample,
    loginWithAWrongEmail,
    loginWithNonExistentEmail,
    loginWithAInvalidPassword,
    loginWithAWrongPassword
  } = require('../../exampleJSONs/user'),
  { incorrectPasswordMessage } = require('../../../app/errors'),
  should = chai.should();

describe('user', () => {
  describe('/user/session POST', () => {
    beforeEach(() => factory.create('user', userExample));
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
          error.text.should.be.equal(incorrectPasswordMessage);
        }));
  });
});
