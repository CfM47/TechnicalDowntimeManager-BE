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

describe('Rate CRUD', () => {
  let id_technician = '';
  let id_user = '';
  let date = '';
  it('should create a new rate', async () => {
    const response = await request(app).post('/api/rate').send({
      id_technician: '61860cce-cd6f-4e07-8db3-37527e32e671',
      id_user: '0733d98f-63b0-405f-8775-26a870c1f434',
      score: 5,
      comment: 'Excellent service'
    });
    expect(response.status).toEqual(200);
    id_technician = response.body.id_technician;
    id_user = response.body.id_user;
    date = response.body.date;
  });

  it('should get all rates', async () => {
    const response = await request(app).get('/api/rate');
    expect(response.status).toEqual(200);
  });

  it('should get rate by ID', async () => {
    const response = await request(app).get(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });

  it('should update rate by ID', async () => {
    const response = await request(app)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 4 });
    expect(response.status).toEqual(200);
  });

  it('should delete rate by ID', async () => {
    const response = await request(app).delete(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });
});
