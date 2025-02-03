import request from 'supertest';
import testingApp from '../../../TestDirectoryServer/testingApp';

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
    const department_origin = await request(testingApp).post('/api/department').send({
      name: 'Departamento de Pruebas'
    });
    const department_receiver = await request(testingApp).post('/api/department').send({
      name: 'Departamento de recibir'
    });
    const id_origin_dep = department_origin.body.id;
    id_dep_receiver = department_receiver.body.id;

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
      id_department: id_dep_receiver,
      isTechnician: false
    });
    id_sender = sender.body.id;
    id_reciever = receiver.body.id;

    const equipment = await request(testingApp).post('/api/equipment').send({
      name: 'Equipo de Pruebas',
      type: 'Electrónico',
      status: 'Mantenimiento',
      id_department: id_origin_dep
    });

    id_equipment = equipment.body.id;
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: id_sender,
      id_receiver: id_reciever,
      id_equipment: id_equipment,
      id_dep_receiver: id_dep_receiver,
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(201);

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
      id_sender: id_sender,
      id_receiver: id_reciever,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver,
      status: 'Bien',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a downtime with invalid type in parameters', async () => {
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: id_sender,
      id_receiver: id_reciever,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver,
      status: 2,
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should not create a downtime with same sender and receiver', async () => {
    const response = await request(testingApp).post('/api/downtime').send({
      id_sender: id_sender,
      id_receiver: id_sender,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver,
      status: 'Baja Definitiva',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing id_sender', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_receiver: id_reciever,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver,
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing id_receiver', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_sender: id_sender,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver,
      status: 'Pendiente de evaluación',
      cause: 'Maintenance'
    });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a downtime with missing fields', async () => {
    const response = await request(testingApp).post('/api/downtime/').send({
      id_sender: id_sender,
      id_receiver: id_reciever,
      id_equipment: id_equipment,
      id_receiver_dep: id_dep_receiver
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
