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
 * Test suite for Transfer CRUD operations.
 *
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
    const response = await request(app).post('/api/transfer').send({
      id_sender: 'add0921a-6979-46a3-a070-5f41a9ac08f7',
      id_receiver: 'e1eb14d6-0750-41f8-975b-316b9dbc1a4d',
      id_equipment: 'a3739594-c850-4669-9c5f-5b43d1253507',
      id_origin_dep: '95262fb4-44fb-46d3-bf08-540c0f16b9c7',
      id_receiver_dep: '18412513-0ac2-41ef-b1bf-826d0acb4952',
      downtime_status: 'active'
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
    const response = await request(app).get('/api/transfer');
    expect(response.status).toEqual(200);
  });

  it('should get transfer by ID', async () => {
    const response = await request(app).get(
      `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
    );
    expect(response.status).toEqual(200);
  });

  it('should update transfer by ID', async () => {
    const response = await request(app)
      .put(
        `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
      )
      .send({ downtime_status: 'inactive' });
    expect(response.status).toEqual(200);
  });

  it('should delete transfer by ID', async () => {
    const response = await request(app).delete(
      `/api/transfer/${id_sender}/${id_receiver}/${id_equipment}/${date}/${id_origin_dep}/${id_receiver_dep}`
    );
    expect(response.status).toEqual(200);
  });
});
