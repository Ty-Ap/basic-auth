const { app } = require('../server');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('API Server', () => {
  test('handles the root path', async () => {
    const response = await mockRequest.get('/');

    expect(response.status).toBe(200);
    expect(response).toBeTruthy();
  });

  test('handles invalid req', async () => {
    const response = await mockRequest.get('/oops');
    expect(response.status).toEqual(404);
  });

  test('handles error', async ()=> {
    const response = await mockRequest.get('/bad');

    expect(response.status).toEqual(500);
    expect(response.text).toBeTruthy();
  });

});