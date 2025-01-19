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

describe('Downtime CRUD', () => {
  let id_sender = '';
  let id_reciever = '';
  let id_equipment = '';
  let id_dep_receiver = '';
  let date = '';
  it('should create a new downtime', async () => {
    const response = await request(app)
      .post('/api/downtime')
      //envia diego recibe mauricio en BD
      .send({
        id_sender: '0733d98f-63b0-405f-8775-26a870c1f434',
        id_receiver: '1ab7ef42-c6f4-45d6-b9e5-aa1f8fd39e3c',
        id_equipment: '0a87207a-3486-445b-97eb-65d14fda2249',
        id_dep_receiver: '76b53f41-c7fb-4048-a076-2cbb0ff60fc6',
        status: 'active',
        cause: 'Maintenance'
      });
    expect(response.status).toEqual(201);

    id_sender = response.body.id_sender;
    id_reciever = response.body.id_receiver;
    id_equipment = response.body.id_equipment;
    id_dep_receiver = response.body.id_dep_receiver;
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
