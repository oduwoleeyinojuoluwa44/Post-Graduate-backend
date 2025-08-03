process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'testdb';
process.env.DB_USER = 'user';
process.env.DB_PASS = '';
process.env.DB_HOST = 'localhost';
process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';
process.env.JWT_SECRET = 'testsecret';

const request = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');

const app = require('../app');
const db = require('../models');

describe('API Endpoints', function () {
  before(async function () {
    await db.sequelize.sync({ force: true });

    await db.programme_mode.create({ programme_mode_name: 'full-time' });
    await db.programme_type.create({ program_name: 'masters' });
    await db.ApplicationCreateProfile.create({ application_id: 'APP123' });

    const password = await bcrypt.hash('adminpass', 10);
    await db.Admin.create({
      staff_id: 'A001',
      email: 'admin@example.com',
      password,
      role: 'ict',
    });
  });

  after(async function () {
    await db.sequelize.close();
  });

  let studentToken;
  let adminToken;
  let paymentId;

  it('GET / should return API running', async function () {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('API is running...');
  });

  it('GET /api/programme/modes should return modes', async function () {
    const res = await request(app).get('/api/programme/modes');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length(1);
  });

  it('GET /api/programme/types should return types', async function () {
    const res = await request(app).get('/api/programme/types');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length(1);
  });

  it('POST /api/student/apply should register student', async function () {
    const res = await request(app)
      .post('/api/student/apply')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret1',
        application_id: 'APP123',
        code: '123456',
      });
    expect(res.status).to.equal(201);
  });

  it('POST /api/student/login should login student', async function () {
    const res = await request(app)
      .post('/api/student/login')
      .send({ email: 'john@example.com', password: 'secret1', code: '123456' });
    expect(res.status).to.equal(200);
    studentToken = res.body.token;
  });

  it('POST /api/student/payment should upload receipt', async function () {
    const res = await request(app)
      .post('/api/student/payment')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ payment_type: 'application_form', receipt_filename: 'receipt.jpg' });
    expect(res.status).to.equal(201);
    paymentId = res.body.paymentId;
  });

  it('GET /api/student/status should show payments', async function () {
    const res = await request(app)
      .get('/api/student/status')
      .set('Authorization', `Bearer ${studentToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.payments).to.be.an('array').with.length(1);
  });

  it('POST /api/admin/login should login admin', async function () {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ staff_id: 'A001', password: 'adminpass' });
    expect(res.status).to.equal(200);
    adminToken = res.body.token;
  });

  it('GET /api/admin/students should return students', async function () {
    const res = await request(app).get('/api/admin/students');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length(1);
  });

  it('PUT /api/payment/approve/:id should approve payment', async function () {
    const res = await request(app)
      .put(`/api/payment/approve/${paymentId}`)
      .send({ status: 'approved' });
    expect(res.status).to.equal(200);
    expect(res.body.payment.status).to.equal('approved');
  });

  it('GET /api/payment should list payments', async function () {
    const res = await request(app).get('/api/payment');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length(1);
  });
});
