import request from 'supertest';
import app from '../app'; // Ensure your Express application is exported from an `app.ts` file.
import mongoose from 'mongoose';

// Mock data
const mockReponse = {
  id: "54321",
  path: "Plomberie ; WC ;",
  text: "Vous avez un problème de fuite d'eau ?",
};

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/testdb');
  // Add a test response to the database
  await mongoose.connection.collection('reponses').insertOne(mockReponse);
});

afterAll(async () => {
  // Clean up the test database
  await mongoose.connection.collection('reponses').deleteMany({});
  await mongoose.disconnect();
});

describe('GET /reponses/:id', () => {
  it('should return a response with a valid ID', async () => {
    const response = await request(app).get(`/reponses/${mockReponse.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', mockReponse.id);
    expect(response.body).toHaveProperty('text', mockReponse.text);
  });

  it('should return a 404 error for an invalid ID', async () => {
    const response = await request(app).get('/reponses/invalid-id');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Response not found');
  });
});
