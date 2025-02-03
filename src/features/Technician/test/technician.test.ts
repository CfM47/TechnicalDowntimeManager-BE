import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';
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
    const department = await request(testingApp).post('/api/department').send({
      name: 'Departamento de Pruebas'
    });
    const id_department = department.body.id;
    const user = await request(testingApp).post('/api/user').send({
      name: 'roberto',
      password: 'revolucionario2025',
      role: 'Técnico',
      id_department: id_department,
      isTechnician: false
    });
    id_user = user.body.id;
    const response = await request(testingApp).post('/api/technician').send({
      id_user: id_user,
      exp_years: 2,
      specialty: 'panadero'
    });
    expect(response.status).toEqual(201);
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
