/* global describe it */

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

describe('Index route', () => {
  it('should return html', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
        done();
      });
  });
});
