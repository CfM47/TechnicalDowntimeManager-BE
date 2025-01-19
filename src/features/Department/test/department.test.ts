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

describe('Department CRUD', () => {
  let departmentId = '';

  it('should create a new department', async () => {
    const response = await request(app)
      .post('/api/department')
      .send({ name: 'Cardiology', description: 'Cardiology Department' });
    expect(response.status).toEqual(200);
    departmentId = response.body.id;
  });

  it('should get all departments', async () => {
    const response = await request(app).get('/api/department');
    expect(response.status).toEqual(200);
  });

  it('should get a department by ID', async () => {
    const response = await request(app).get(`/api/department/${departmentId}`);
    expect(response.status).toEqual(200);
  });

  it('should update a department by ID', async () => {
    const response = await request(app)
      .put(`/api/department/${departmentId}`)
      .send({ name: 'Neurology' });
    expect(response.status).toEqual(200);
  });

  it('should delete a department by ID', async () => {
    const response = await request(app).delete(`/api/department/${departmentId}`);
    expect(response.status).toEqual(200);
  });
});
