import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

/**
 * Sets up the Express application with necessary middleware and routes.
 */

/**
 * Test suite for Equipment CRUD operations.
 */
describe('Equipment CRUD', () => {
  let equipmentId = '';

  /**
   * Test case for creating a new equipment.
   */
  it('should create a new equipment', async () => {
    const response = await request(testingApp).post('/api/equipment').send({
      name: 'High resolution X-Ray machine',
      type: 'Electrónico',
      status: 'Mantenimiento',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    });
    expect(response.status).toEqual(201);
    equipmentId = response.body.id;
  });

  /**
   * Test case for retrieving all equipment.
   */
  it('should get all equipment', async () => {
    const response = await request(testingApp).get('/api/equipment');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for retrieving equipment by ID.
   */
  it('should get equipment by ID', async () => {
    const response = await request(testingApp).get(`/api/equipment/${equipmentId}`);
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for updating equipment by ID.
   */
  it('should update equipment by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/equipment/${equipmentId}`)
      .send({ name: 'Updated X-Ray Machine' });
    expect(response.status).toEqual(200);
  });

  it('should not update equipment by ID for an invalid parameter type', async () => {
    const response = await request(testingApp)
      .put(`/api/equipment/${equipmentId}`)
      .send({ name: true });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for creating equipment with missing fields.
   */
  it('should not create equipment with missing fields', async () => {
    const response = await request(testingApp).post('/api/equipment').send({
      name: 'Incomplete Equipment'
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for retrieving equipment with invalid ID.
   */
  it('should return 404 for retrieving equipment with invalid ID', async () => {
    const response = await request(testingApp).get(
      '/api/equipment/86bef522-ad02-4e29-a4ba-b4fc96a01bb2'
    );
    expect(response.status).toEqual(404);
  });

  it('should return 500 for retrieving equipment with invalid ID type', async () => {
    const response = await request(testingApp).get('/api/equipment/346346424');
    expect(response.status).toEqual(500);
  });

  /**
   * Test case for creating equipment with invalid data type.
   */
  it('should return 400 for creating equipment with invalid data type', async () => {
    const response = await request(testingApp).post('/api/equipment').send({
      name: 12345,
      type: 'Electrónico',
      status: 'Mantenimiento',
      id_department: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for updating equipment with invalid data type.
   */
  it('should return 400 for updating equipment with invalid data type', async () => {
    const response = await request(testingApp)
      .put(`/api/equipment/86bef522-ad02-4e29-a4ba-b4fc96a01bb1`)
      .send({ name: 12345 });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for deleting equipment by ID.
   */
  it('should delete equipment by ID', async () => {
    const response = await request(testingApp).delete(`/api/equipment/${equipmentId}`);
    expect(response.status).toEqual(200);
  });
});
