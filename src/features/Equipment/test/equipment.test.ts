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

describe('Equipment CRUD', () => {
  let equipmentId = '';

  it('should create a new equipment', async () => {
    const response = await request(app).post('/api/equipment').send({
      name: 'High resolution X-Ray machine',
      type: 'X-ray Machine',
      state: 'active',
      id_department: '24cc863c-2969-49a3-ac60-8db75a3d3b35'
    });
    expect(response.status).toEqual(201);
    equipmentId = response.body.id;
  });

  it('should get all equipment', async () => {
    const response = await request(app).get('/api/equipment');
    expect(response.status).toEqual(200);
  });

  it('should get equipment by ID', async () => {
    const response = await request(app).get(`/api/equipment/${equipmentId}`);
    expect(response.status).toEqual(200);
  });

  it('should update equipment by ID', async () => {
    const response = await request(app)
      .put(`/api/equipment/${equipmentId}`)
      .send({ name: 'Updated X-Ray Machine' });
    expect(response.status).toEqual(200);
  });

  it('should delete equipment by ID', async () => {
    const response = await request(app).delete(`/api/equipment/${equipmentId}`);
    expect(response.status).toEqual(200);
  });
});
