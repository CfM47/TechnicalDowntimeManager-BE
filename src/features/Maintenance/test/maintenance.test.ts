import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

/**
 * Test suite for Maintenance CRUD operations.
 */
describe('Maintenance CRUD', () => {
  let id_technician = '';
  let id_equipment = '';
  let date = '';

  /**
   * Test case for creating a new maintenance record.
   */
  it('should create a new maintenance', async () => {
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
    const id_user = user.body.id;
    const technician = await request(testingApp).post('/api/technician').send({
      id_user: id_user,
      exp_years: 2,
      specialty: 'panadero'
    });
    id_technician = technician.body.id;

    const equipment = await request(testingApp).post('/api/equipment').send({
      name: 'High resolution X-Ray machine',
      type: 'Electrónico',
      status: 'Mantenimiento',
      id_department: id_department
    });

    id_equipment = equipment.body.id;

    const response = await request(testingApp).post('/api/maintenance').send({
      id_technician: id_technician,
      type: 'Preventivo',
      cost: 12,
      id_equipment: id_equipment
    });
    expect(response.status).toEqual(201);
    date = response.body.date;
  });

  /**
   * Test case for retrieving all maintenance records.
   */
  it('should get all maintenance records', async () => {
    const response = await request(testingApp).get('/api/maintenance');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for handling errors when creating a new maintenance record with missing fields.
   */
  it('should return 400 for missing fields when creating maintenance', async () => {
    const response = await request(testingApp).post('/api/maintenance').send({
      type: 'Preventivo',
      cost: 12
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for handling errors when retrieving a non-existent maintenance record.
   */

  it('should return 404 for an invalid tech id', async () => {
    const response = await request(testingApp).get(
      `/api/maintenance/500e407b-681e-418a-b51a-76d86d5feec6/056385ca-5db2-4b83-a6c7-f0f40ddecd60/${date}`
    );
    expect(response.status).toEqual(404);
  });
  it('should return 404 for invalid equipment id', async () => {
    const response = await request(testingApp).get(
      `/api/maintenance/500e408b-681e-418a-b51a-76d86d5feec6/056385ca-5db2-4b83-a6c7-f0f40ddecd50/${date}`
    );
    expect(response.status).toEqual(404);
  });

  /**
   * Test case for retrieving a maintenance record by ID.
   */
  it('should get maintenance by ID', async () => {
    const response = await request(testingApp).get(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for updating a maintenance record by ID.
   */
  it('should update maintenance by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/maintenance/${id_technician}/${id_equipment}/${date}`)
      .send({ cost: 20 });
    expect(response.status).toEqual(200);
  });

  it('should not update maintenance by ID for invalid parameter type', async () => {
    const response = await request(testingApp)
      .put(`/api/maintenance/${id_technician}/${id_equipment}/${date}`)
      .send({ cost: '23' });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for deleting a maintenance record by ID.
   */
  it('should delete maintenance by ID', async () => {
    const response = await request(testingApp).delete(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });
});
