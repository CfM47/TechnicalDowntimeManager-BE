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

describe('User CRUD', () => {
  let userId = '';

  it('should create a new user', async () => {
    const response = await request(app).post('/api/user').send({
      name: 'Diego Doe',
      password: 'Candela',
      id_role: 1,
      id_department: '1c5e96e4-f66b-4cdc-95ae-5c0c07a41340'
    });
    expect(response.status).toEqual(201);
    userId = response.body.id;
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/user');
    expect(response.status).toEqual(200);
  });

  it('should get a user by ID', async () => {
    const response = await request(app).get(`/api/user/${userId}`);
    expect(response.status).toEqual(200);
  });

  it('should update a user by ID', async () => {
    const response = await request(app)
      .put(`/api/user/${userId}`)
      .send({ password: 'newpassword123' });
    expect(response.status).toEqual(200);
  });

  it('should delete a user by ID', async () => {
    const response = await request(app).delete(`/api/user/${userId}`);
    expect(response.status).toEqual(200);
  });
});
