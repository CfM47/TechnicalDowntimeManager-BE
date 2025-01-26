import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { appRouter } from '../../../router';
import { appModels } from '../../../index';

const app = express();
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.use('/api', appRouter(appModels));

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
    const response = await request(app).post('/api/downtime').send({
      id_sender: 'add0921a-6979-46a3-a070-5f41a9ac08f7',
      id_receiver: 'e1eb14d6-0750-41f8-975b-316b9dbc1a4d',
      id_equipment: 'a3739594-c850-4669-9c5f-5b43d1253507',
      id_dep_receiver: '18412513-0ac2-41ef-b1bf-826d0acb4952',
      status: 'active',
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
    const response = await request(app).get('/api/downtime');
    expect(response.status).toEqual(200);
  });

  it('should get a downtime by ID', async () => {
    const response = await request(app).get(
      `/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`
    );
    expect(response.status).toEqual(200);
  });

  it('should update a downtime by ID', async () => {
    const response = await request(app)
      .put(`/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`)
      .send({ status: 'inactive' });
    expect(response.status).toEqual(200);
  });

  it('should delete a downtime by ID', async () => {
    const response = await request(app).delete(
      `/api/downtime/${id_sender}/${id_reciever}/${id_equipment}/${date}/${id_dep_receiver}`
    );
    expect(response.status).toEqual(200);
  });
});
