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

describe('Transfer CRUD', () => {
  let id_sender = '';
  let id_receiver = '';
  let id_equipment = '';
  let id_origin_dep = '';
  let id_receiver_dep = '';
  let date = '';
  it('should create a new transfer', async () => {
    const response = await request(app).post('/api/transfer').send({
      id_sender: '0733d98f-63b0-405f-8775-26a870c1f434',
      id_receiver: '1ab7ef42-c6f4-45d6-b9e5-aa1f8fd39e3c',
      id_equipment: '0a87207a-3486-445b-97eb-65d14fda2249',
      id_origin_dep: '1c5e96e4-f66b-4cdc-95ae-5c0c07a41340',
      id_receiver_dep: '76b53f41-c7fb-4048-a076-2cbb0ff60fc6',
      downtime_status: 'active'
    });
    expect(response.status).toEqual(201);

    id_sender = response.body.id_sender;
    id_receiver = response.body.id_receiver;
    id_equipment = response.body.id_equipment;
    id_origin_dep = response.body.id_origin_dep;
    id_receiver_dep = response.body.id_receiver_dep;
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
