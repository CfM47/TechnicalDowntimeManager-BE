import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

/**
 * Sets up the Express application with necessary middleware and routes.
 */

/**
 * Test suite for CRUD operations on the Department entity.
 *
 * This suite includes tests for creating, retrieving, updating, and deleting
 * department records. It uses the `supertest` library to make HTTP requests
 * to the Express application and verifies the responses.
 */
describe('Department CRUD', () => {
  let departmentId = '';

  it('should create a new department', async () => {
    const response = await request(testingApp).post('/api/department').send({ name: 'Cardiology' });
    expect(response.status).toEqual(200);
    departmentId = response.body.id;
  });

  it('should return 400 for invalid department creation', async () => {
    const response = await request(testingApp).post('/api/department').send({ name: 2 });
    expect(response.status).toEqual(400);
  });

  it('should return 404 for non-existent department', async () => {
    const response = await request(testingApp).get(
      '/api/department/02d6ddd9-7f7e-4c60-8c2d-79cba69736b7'
    );
    expect(response.status).toEqual(404);
  });

  it('should not update a department with invalid data', async () => {
    const response = await request(testingApp)
      .put(`/api/department/4bef9dc3-6584-41f8-9415-a9bd8726f646`)
      .send({ name: false });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a department with missing fields', async () => {
    const response = await request(testingApp).post('/api/department').send({});
    expect(response.status).toEqual(400);
  });

  it('should get all departments', async () => {
    const response = await request(testingApp).get('/api/department');
    expect(response.status).toEqual(200);
  });

  it('should get a department by ID', async () => {
    const response = await request(testingApp).get(`/api/department/${departmentId}`);
    expect(response.status).toEqual(200);
  });

  it('should update a department by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/department/${departmentId}`)
      .send({ name: 'Neurology' });
    expect(response.status).toEqual(200);
  });

  it('should delete a department by ID', async () => {
    const response = await request(testingApp).delete(`/api/department/${departmentId}`);
    expect(response.status).toEqual(200);
  });
});
