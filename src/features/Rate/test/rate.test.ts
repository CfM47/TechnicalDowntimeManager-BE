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
      id_technician: 'add0921a-6979-46a3-a070-5f41a9ac08f7',
      id_user: '84732729-8c92-4067-9912-9f6743920bb3',
      score: 5,
      comment: 'Excellent service'
    });
    expect(response.status).toEqual(200);
    id_technician = response.body.technician.id;
    id_user = response.body.user.id;
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
