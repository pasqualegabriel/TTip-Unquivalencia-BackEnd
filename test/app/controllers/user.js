const chai = require('chai'),
  server = require('./../../../app'),
  { factory } = require('factory-girl'),
  { userExample, loginExample } = require('../../exampleJSONs/user'),
  should = chai.should();

describe('user', () => {
  describe('/user/session POST', () => {
    beforeEach(() => factory.create('user', userExample));
    it('Should successfully POST login', () =>
      chai
        .request(server)
        .post('/api/v1/user/session')
        .send(loginExample)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          res.body.user.email.should.be.eq(userExample.email);
        }));
  });
});
