import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

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
  let date = '';
  let id_origin_dep = '';
  let id_receiver_dep = '';

  it('should create a new transfer', async () => {
    const department_origin = await request(testingApp).post('/api/department').send({
      name: 'Departamento de Pruebas'
    });
    const department_receiver = await request(testingApp).post('/api/department').send({
      name: 'Departamento de recibir'
    });
    id_origin_dep = department_origin.body.id;
    id_receiver_dep = department_receiver.body.id;

    const sender = await request(testingApp).post('/api/user').send({
      name: 'roberto',
      password: 'revolucionario2025',
      role: 'Técnico',
      id_department: id_origin_dep,
      isTechnician: false
    });

    const receiver = await request(testingApp).post('/api/user').send({
      name: 'luis',
      password: 'revolucionario2026',
      role: 'Técnico',
      id_department: id_receiver_dep,
      isTechnician: false
    });
    id_sender = sender.body.id;
    id_receiver = receiver.body.id;

    const equipment = await request(testingApp).post('/api/equipment').send({
      name: 'Equipo de Pruebas',
      type: 'Electrónico',
      status: 'Mantenimiento',
      id_department: id_origin_dep
    });

    id_equipment = equipment.body.id;

    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: id_sender,
      id_receiver: id_receiver,
      id_equipment: id_equipment,
      id_origin_dep: id_origin_dep,
      id_receiver_dep: id_receiver_dep,
      status: 'Pendiente'
    });
    expect(response.status).toEqual(201);

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
      id_sender: id_sender,
      id_receiver: id_receiver,
      id_equipment: id_equipment,
      id_origin_dep: id_origin_dep,
      id_receiver_dep: id_receiver_dep,
      status: 'Bien'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a transfer with same department', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: id_sender,
      id_receiver: id_receiver,
      id_equipment: id_equipment,
      id_origin_dep: id_origin_dep,
      id_receiver_dep: id_origin_dep,
      status: 'Pendiente'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a transfer with same sender and receiver', async () => {
    const response = await request(testingApp).post('/api/transfer').send({
      id_sender: id_sender,
      id_receiver: id_sender,
      id_equipment: id_equipment,
      id_origin_dep: id_origin_dep,
      id_receiver_dep: id_receiver_dep,
      status: 'Pendiente'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a transfer with missing fields', async () => {
    const response = await request(testingApp).post('/api/transfer/').send({
      id_sender: id_sender,
      id_receiver: id_receiver,
      id_equipment: id_equipment,
      id_receiver_dep: id_receiver_dep
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
