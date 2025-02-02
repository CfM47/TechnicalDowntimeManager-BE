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

describe('Role CRUD', () => {
  let roleId = '';

  it('should create a new role', async () => {
    const response = await request(app).post('/api/role').send({ name: 'Medico' });
    expect(response.status).toEqual(200);
    roleId = response.body.id;
  });

  it('should get all roles', async () => {
    const response = await request(app).get('/api/role');
    expect(response.status).toEqual(200);
  });

  it('should get a role by ID', async () => {
    const response = await request(app).get(`/api/role/${roleId}`);
    expect(response.status).toEqual(200);
  });

  it('should update a role by ID', async () => {
    const response = await request(app).put(`/api/role/${roleId}`).send({ name: 'SuperAdmin' });
    expect(response.status).toEqual(200);
  });

  it('should delete a role by ID', async () => {
    const response = await request(app).delete(`/api/role/${roleId}`);
    expect(response.status).toEqual(200);
  });
});
