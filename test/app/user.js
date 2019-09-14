const chai = require('chai'),
  server = require('./../../app'),
  should = chai.should(),
  { factory } = require('factory-girl');

describe('user controller', () => {
  beforeEach(() => factory.create('user'));
  it('should get a user', () =>
    chai
      .request(server)
      .get('/users')
      .then(res => {
        res.should.have.status(200);
        res.body.length.should.be.equal(1);
      }));
});
