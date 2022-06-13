const chai = require('chai');
const supertest = require('supertest');
const { build } = require('../server');
const services = require('../services/index');
const { db } = services();
const userModel = require('../models/user');
const storeModel = require('../models/store');
const { deleteUsers, deleteStores } = require('../utils/cleanDb');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const app = build();

const request = supertest(app);
const { expect } = chai;
const fakeBase64User = Buffer.from('user@test.com:123').toString('base64');
const fakeStore = {
  name: 'Test',
  cuit: '20-36612123-3',
  concepts: ['some concept', 'another concept'],
  currentBalance: 1000000,
  lastSale: '01/10/2022',
};

describe('GET /api/stores', () => {
  before(async () => {
    await db.connect();
  });
  beforeEach(async () => {
    await deleteUsers();
    await deleteStores();
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
  });

  it.skip('should return status 200 and valid payload when user is authenticated', async () => {
    await userModel.create({
      username: 'user@test.com:123',
      password: 'base64',
    });

    await storeModel.create({ fakeStore });
    const { status, body } = await request
      .get('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`);
    expect(status).to.be(200);
    expect(body).to.be.deep.equal(fakeStore);
    expect(body).to.have.property('name');
    expect(body).to.have.property('cuit');
    expect(body).to.have.property('concepts');
    expect(body).to.have.property('lastSale');
  });
});

describe('POST /api/stores', () => {
  before(async () => {
    await db.connect();
    console.log(mongoose.STATES[mongoose.connection.readyState]);
  });
  beforeEach(async () => {
    await deleteUsers();
    await deleteStores();
  });
  afterEach(async () => {
    await deleteUsers();
    await deleteStores();
  });
  it('should return status 401 when user is not authorized', async () => {
    const { status, body } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`);
    expect(status).to.be.equal(401);
  });

  it('should return status 401 when not sending authorization data in header', async () => {
    const { status, body } = await request.post('/api/stores');
    expect(status).to.be.equal(401);
  });

  it('should return status 400 when trying to save a store that already exist in database', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    await storeModel.create(fakeStore);
    const { status, body } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        name: 'Test',
        cuit: '20-36612123-3',
        concepts: ['some concept', 'another concept'],
        currentBalance: 1000000,
        lastSale: '01/10/2022',
      });
    expect(status).to.be.equal(400);
  });

  it('should return status 201 when a store is properly saved in database', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status, body } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send(fakeStore);
    expect(status).to.be.equal(201);
  });

  it('should return status 400 when not sending NAME in payload', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        cuit: '20-1222333-3',
        concepts: ['some concept', 'another concept'],
        currentBalance: 1000000,
        lastSale: '01/10/2022',
      });
    expect(status).to.be.equal(400);
  });
  it('should return status 400 when not sending CUIT in payload', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        name: 'Test',
        concepts: ['some concept', 'another concept'],
        currentBalance: 1000000,
        lastSale: '01/10/2022',
      });
    expect(status).to.be.equal(400);
  });
  it('should return status 400 when not sending CONCEPTS in payload', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        name: 'Test',
        cuit: '20-1222333-3',
        currentBalance: 1000000,
        lastSale: '01/10/2022',
      });
    expect(status).to.be.equal(400);
  });

  it('should return status 400 when not sending CURRENT BALABCE in payload', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        name: 'Test',
        cuit: '20-1222333-3',
        concepts: ['some concept', 'another concept'],
        lastSale: '01/10/2022',
      });
    expect(status).to.be.equal(400);
  });

  it('should return status 400 when not sending LASTSALE in payload', async () => {
    await userModel.create({
      username: 'user@test.com',
      password: '123',
    });
    const { status } = await request
      .post('/api/stores')
      .set('Authorization', `Basic ${fakeBase64User}`)
      .send({
        name: 'Test',
        cuit: '20-1222333-3',
        concepts: ['some concept', 'another concept'],
        currentBalance: 1000000,
      });
    expect(status).to.be.equal(400);
  });
});
