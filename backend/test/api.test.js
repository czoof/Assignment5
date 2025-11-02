import request from 'supertest';
import app from '../server.js';

describe('Recipe API Endpoints', () => {
  it('should respond 200 from /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });
});
