import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';
import { server } from '../../../TestDirectoryServer/server';

/**
 * Sets up the Express application with necessary middleware and routes.
 */

afterAll((done) => {
  server.close(done); // Cierra el servidor después de las pruebas
});
/**
 * Test suite for Transfer CRUD operations.
 * This suite tests the following functionalities:
 * - Creating a new transfer
 * - Retrieving all transfers
 * - Retrieving a transfer by ID
 * - Updating a transfer by ID
 * - Deleting a transfer by ID
 */
describe('Transfer CRUD', () => {
  let id_sender = '';
  let id_receiver = '';
  let id_equipment = '';
  let id_origin_dep = '';
  let id_receiver_dep = '';
  let date = '';
  it('should create a new transfer', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_origin_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Pendiente'
    });
    expect(response.status).toEqual(201);

    id_sender = response.body.sender.id;
    id_receiver = response.body.receiver.id;
    id_equipment = response.body.equipment.id;
    id_origin_dep = response.body.origin_dep.id;
    id_receiver_dep = response.body.receiver_dep.id;
    date = response.body.date;
  });

  it('should get all transfers', async () => {
    const response = await request(testingApp).get('/api/transfer');
    expect(response.status).toEqual(200);
  });

  it('should get transfer by ID', async () => {
    const response = await request(testingApp).get(
      `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
    );
    expect(response.status).toEqual(200);
  });

  it('should update transfer by ID', async () => {
    const response = await request(testingApp)
      .put(
        `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
      )
      .send({ status: 'Aprobado' });
    expect(response.status).toEqual(200);
  });

  it('should return 404 for non-existent transfer', async () => {
    const response = await request(testingApp).get(
      `/api/transfer/86bef522-ad02-4e29-a4ba-b4fc96a01bb2`
    );
    expect(response.status).toEqual(404);
  });

  it('should not create a transfer with invalid status', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_origin_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Bien'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a transfer with same department', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_origin_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      id_receiver_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      status: 'Pendiente'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a transfer with same sender and receiver', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_origin_dep: '08f6e7f5-0649-47b4-81bc-05c3734ecd1f',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646',
      status: 'Pendiente'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a transfer with missing fields', async () => {
    const response = await request(testingApp).post('/api/transfer/').send({
      id_sender: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_receiver: '02d6ddd9-7f7e-4c60-8c2d-79cba69736b9',
      id_equipment: '86bef522-ad02-4e29-a4ba-b4fc96a01bb1',
      id_receiver_dep: '4bef9dc3-6584-41f8-9415-a9bd8726f646'
    });
    expect(response.status).toEqual(400);
  });

  it('should delete transfer by ID', async () => {
    const response = await request(testingApp).delete(
      `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
    );
    expect(response.status).toEqual(200);
  });
});
