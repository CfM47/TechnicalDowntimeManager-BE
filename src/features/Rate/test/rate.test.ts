import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

/**
 * Test suite for CRUD operations on the `Rate` resource.
 */
describe('Rate CRUD', () => {
  let id_technician = '';
  let id_user = '';
  let date = '';

  /**
   * Test case for creating a new rate.
   * Sends a POST request to create a new rate and verifies the response status.
   */
  it('should create a new rate', async () => {
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
    const id_userT = user.body.id;
    const technician = await request(testingApp).post('/api/technician').send({
      id_user: id_userT,
      exp_years: 2,
      specialty: 'panadero'
    });

    id_technician = technician.body.id;

    const department2 = await request(testingApp).post('/api/department').send({
      name: 'Departamento de Pruebas2'
    });
    const id_department2 = department2.body.id;
    const user2 = await request(testingApp).post('/api/user').send({
      name: 'luis',
      password: 'revolucionario2026',
      role: 'Jefe de sección',
      id_department: id_department2,
      isTechnician: false
    });

    id_user = user2.body.id;

    const response = await request(testingApp).post('/api/rate').send({
      id_technician: id_technician,
      id_user: id_user,
      score: 5,
      comment: 'Excellent service'
    });
    expect(response.status).toEqual(200);
    date = response.body.date;
  });

  /**
   * Test case for retrieving all rates.
   * Sends a GET request to retrieve all rates and verifies the response status.
   */
  it('should get all rates', async () => {
    const response = await request(testingApp).get('/api/rate');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for retrieving a rate by ID.
   * Sends a GET request to retrieve a rate by its ID and verifies the response status.
   */
  it('should get rate by ID', async () => {
    const response = await request(testingApp).get(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });

  it('should return an error for invalid user ID', async () => {
    const response = await request(testingApp).get(
      `/api/rate/af4685e7-87ef-4a82-9e88-7155be87f899/02d6ddd9-7f7e-4c60-8c2d-79cba69736b7/${date}`
    );
    expect(response.status).toEqual(404);
  });

  it('should return an error for invalid parameters in update a rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 'cuatro' });
    expect(response.status).toEqual(400);
  });

  it('should return an error for invalid parameters in update a rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ comment: 456 });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a rate with missing fields', async () => {
    const response = await request(testingApp).post('/api/rate/').send({
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      score: 5,
      comment: 'Excellent service'
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for handling errors when creating a new rate with invalid data.
   * Sends a POST request with invalid data and verifies the response status.
   */
  it('should return an error for invalid data', async () => {
    const response = await request(testingApp).post('/api/rate').send({
      id_technician: '',
      id_user: '',
      score: -1,
      comment: ''
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for updating a rate by ID.
   * Sends a PUT request to update a rate by its ID and verifies the response status.
   */
  it('should update rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 4 });
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for deleting a rate by ID.
   * Sends a DELETE request to delete a rate by its ID and verifies the response status.
   */
  it('should delete rate by ID', async () => {
    const response = await request(testingApp).delete(
      `/api/rate/${id_technician}/${id_user}/${date}`
    );
    expect(response.status).toEqual(200);
  });
});
