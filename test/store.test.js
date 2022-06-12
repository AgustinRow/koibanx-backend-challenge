const chai = require('chai');
const supertest = require('supertest');
const { start, build } = require('../server');
const services = require('../services/index');
const { db } = services();

const app = build();

const request = supertest(app);
const { expect } = chai;
const fakeBase64User = Buffer.from('user@test.com:123').toString('base64');

describe('GET /api/stores', () => {
  before(async () => {
    db.connect();
  });
  it('should return status 401 when user is not authorized', async () => {
    const { status, body } = await request
      .get('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`);
    expect(status).to.be.equal(401);
  });

  it('should return status 401 when not sending authorization data in header', async () => {
    const { status, body } = await request.get('/api/stores');
    expect(status).to.be.equal(401);
  }),
    it('should return status 200 and valid payload when user is authenticated', async () => {
      const { status, body } = await request
        .get('/api/stores')
        .set('Authorization', 'Basic 1234');
    });
});
