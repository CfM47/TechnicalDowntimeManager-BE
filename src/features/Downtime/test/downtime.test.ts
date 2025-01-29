import request from 'supertest';
import testingApp from '../../../test/testingApp';

/**
 * Sets up the Express application with necessary middleware and routes.
 */

/**
 * Test suite for CRUD operations on the Downtime entity.
 *
 * This suite includes tests for creating, retrieving, updating, and deleting
 * downtime records. It uses the `supertest` library to make HTTP requests
 * to the Express application and verifies the responses.
 */
describe('Downtime CRUD', () => {
  let id_sender = '';
  let id_reciever = '';
  let id_equipment = '';
  let id_dep_receiver = '';
  let date = '';
  it('should create a new downtime', async () => {
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_dep_receiver: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(201);

    id_sender = response.body.sender.id;
    id_reciever = response.body.receiver.id;
    id_equipment = response.body.equipment.id;
    id_dep_receiver = response.body.dep_receiver.id;
    date = response.body.date;
  });

  it('should get all downtimes', async () => {
    const response = await request(testingApp).get('/api/downtime');
    expect(response.status).toEqual(200);
  });

  it('should get a downtime by ID', async () => {
    const response = await request(testingApp).get(
      `/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`
    );
    expect(response.status).toEqual(200);
  });

  it('should return 404 for non-existent transfer', async () => {
    const response = await request(testingApp).get(
      `/api/transfer/86bef522-ad02-4e29-a4ba-b4fc96a01bb2`
    );
    expect(response.status).toEqual(404);
  });

  it('should not create a downtime with invalid status', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Bien',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a downtime with invalid type in parameters', async () => {
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      status: 2,
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a downtime with same sender and receiver', async () => {
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_origin_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Baja Definitiva',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing id_sender', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_receiver: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing id_receiver', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing fields', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    });
    expect(response.status).toEqual(400);
  });

  it('should update a downtime by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`)
      .send({ status: 'Reutilizado' });
    expect(response.status).toEqual(200);
  });

  it('should delete a downtime by ID', async () => {
    const response = await request(testingApp).delete(
      `/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`
    );
    expect(response.status).toEqual(200);
  });
});
