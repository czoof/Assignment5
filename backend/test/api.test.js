import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
  it('should return 200 for GET /api/recipes', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 for an invalid route', async () => {
    const res = await request(app).get('/api/doesnotexist');
    expect(res.statusCode).toBe(404);
  });
});
