import request from 'supertest';
import app from '../server.js';

describe('Recipe API Endpoints', () => {
  it('should respond 200 from /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  it('should return an array from /api/recipes', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
