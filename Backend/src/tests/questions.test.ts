import request from 'supertest';
import app from '../app'; // Ensure your Express application is exported from an `app.ts` file.
import mongoose from 'mongoose';

// Mock data
const mockQuestion = {
  id: "12345",
  text: "Test Question",
  options: [
    { text: "Option 1", nextQuestionId: "67890" },
    { text: "Option 2", nextQuestionId: null },
  ],
  type: "multiple-choice",
  previousQuestionId: null,
};

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/testdb');
  // Add a test question to the database
  await mongoose.connection.collection('questions').insertOne(mockQuestion);
});

afterAll(async () => {
  // Clean up the test database
  await mongoose.connection.collection('questions').deleteMany({});
  await mongoose.disconnect();
});

describe('GET /questions/:id', () => {
  it('should return a question with a valid ID', async () => {
    const response = await request(app).get(`/questions/${mockQuestion.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', mockQuestion.id);
    expect(response.body).toHaveProperty('text', mockQuestion.text);
  });

  it('should return a 404 error for an invalid ID', async () => {
    const response = await request(app).get('/questions/invalid-id');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Question not found');
  });
});
