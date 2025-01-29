import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';
/**
 * Sets up the Express application with necessary middleware and routes.
 */

/**
 * Test suite for User CRUD operations.
 * This suite includes tests for creating, retrieving, updating, and deleting users.
 * Each test case sends HTTP requests to the API endpoints and verifies the responses.
 */

describe('User CRUD', () => {
  let userId = '';

  it('should create a new user', async () => {
    const response = await request(testingApp).post('/api/user').send({
      name: 'roberto',
      password: 'revolucionario2025',
      role: 'Técnico',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      isTechnician: false
    });
    expect(response.status).toEqual(201);
    userId = response.body.id;
  });

  it('should get all users', async () => {
    const response = await request(testingApp).get('/api/user');
    expect(response.status).toEqual(200);
  });

  it('should get a user by ID', async () => {
    const response = await request(testingApp).get(`/api/user/${userId}`);
    expect(response.status).toEqual(200);
  });

  it('should update a user by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/user/${userId}`)
      .send({ password: 'newpassword123' });
    expect(response.status).toEqual(200);
  });

  it('should return 404 for non-existent user', async () => {
    const response = await request(testingApp).get(
      '/api/user/02d6ddd9-7f7e-4c60-8c2d-79cba69736b7'
    );
    expect(response.status).toEqual(404);
  });

  it('should not create a user with invalid data', async () => {
    const response = await request(testingApp).post('/api/user').send({
      name: '',
      password: 'short',
      role: 'InvalidRole',
      id_department: 'invalid-id',
      isTechnician: 'not-a-boolean'
    });
    expect(response.status).toEqual(400);
  });

  it('should not update a user with invalid data', async () => {
    const response = await request(testingApp)
      .put(`/api/user/02d6ddd9-7f7e-4c60-8c2d-79cba69736b9`)
      .send({ role: 'Futbolista' });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a user with missing fields', async () => {
    const response = await request(testingApp).post('/api/user').send({
      name: 'roberto'
    });
    expect(response.status).toEqual(400);
  });

  it('should delete a user by ID', async () => {
    const response = await request(testingApp).delete(`/api/user/${userId}`);
    expect(response.status).toEqual(200);
  });
});
