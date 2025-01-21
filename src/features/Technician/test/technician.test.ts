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

describe('Technician CRUD', () => {
  let id_user = '';

  it('should create a new technician', async () => {
    const response = await request(app).post('/api/technician').send({
      id_user: '41893260-aaf4-4339-ac97-39019b6c2343',
      exp_years: 2,
      specialty: 'panadero'
    });
    expect(response.status).toEqual(201);
    id_user = response.body.id;
  });

  it('should get all technicians', async () => {
    const response = await request(app).get('/api/technician');
    expect(response.status).toEqual(200);
  });

  it('should get technician by ID', async () => {
    const response = await request(app).get(`/api/technician/${id_user}`);
    expect(response.status).toEqual(200);
  });

  it('should update technician by ID', async () => {
    const response = await request(app).put(`/api/technician/${id_user}`).send({ exp_years: 4 });
    expect(response.status).toEqual(200);
  });

  it('should delete technician by ID', async () => {
    const response = await request(app).delete(`/api/technician/${id_user}`);
    expect(response.status).toEqual(200);
  });
});
