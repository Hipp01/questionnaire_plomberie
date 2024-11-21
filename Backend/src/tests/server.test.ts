import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

describe('Server and Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/depannage', {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database successfully', async () => {
    const state = mongoose.connection.readyState;
    expect(state).toBe(1); // 1 means connected
  });

  it('should start the server and respond to the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Welcome to the Plumbing Questionnaire API!');
    expect(response.body).toHaveProperty('routes');
    expect(response.body.routes).toHaveProperty('questions', '/questions/:id');
    expect(response.body.routes).toHaveProperty('reponses', '/reponses/:id');
  });
});
