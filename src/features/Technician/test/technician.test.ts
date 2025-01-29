import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

/**
 * Sets up the Express application with necessary middleware and routes.
 */

/**
 * Test suite for Technician CRUD operations.
 *
 * This suite tests the following operations:
 * - Creating a new technician
 * - Retrieving all technicians
 * - Retrieving a technician by ID
 * - Updating a technician by ID
 * - Deleting a technician by ID
 */
describe('Technician CRUD', () => {
  let id_user = '';

  it('should create a new technician', async () => {
    const response = await request(testingApp).post('/api/technician').send({
      id_user: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      exp_years: 2,
      specialty: 'panadero'
    });
    expect(response.status).toEqual(201);
    id_user = response.body.id;
  });

  it('should get all technicians', async () => {
    const response = await request(testingApp).get('/api/technician');
    expect(response.status).toEqual(200);
  });

  it('should get technician by ID', async () => {
    const response = await request(testingApp).get(`/api/technician/${id_user}`);
    expect(response.status).toEqual(200);
  });

  it('should update technician by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/technician/${id_user}`)
      .send({ exp_years: 4 });
    expect(response.status).toEqual(200);
  });

  it('should return 404 for non-existent technician', async () => {
    const response = await request(testingApp).get(
      '/api/technician/500e408b-681e-418a-b51a-76d86d5feec7'
    );
    expect(response.status).toEqual(404);
  });

  it('should return 400 for missing required fields', async () => {
    const response = await request(testingApp).post('/api/technician').send({});
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a Tech with missing fields', async () => {
    const response = await request(testingApp).post('/api/technician').send({
      specialty: 'panadero'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for updating a Tech with wrongs fields', async () => {
    const response = await request(testingApp)
      .put('/api/technician/af4685e7-87ef-4a82-9e88-7155be87f899')
      .send({
        exp_years: 'diez años'
      });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for updating a Tech with wrongs fields', async () => {
    const response = await request(testingApp)
      .put('/api/technician/af4685e7-87ef-4a82-9e88-7155be87f899')
      .send({
        specialty: 23
      });
    expect(response.status).toEqual(400);
  });

  it('should return 500 for invalid technician ID format', async () => {
    const response = await request(testingApp).get('/api/technician/2231513523');
    expect(response.status).toEqual(500);
  });

  it('should delete technician by ID', async () => {
    const response = await request(testingApp).delete(`/api/technician/${id_user}`);
    expect(response.status).toEqual(200);
  });
});
