import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { appRouter } from '../../../router';
import { appModels } from '../../../index';

/**
 * Sets up the Express application with necessary middleware and routes.
 */
const app = express();
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.use('/api', appRouter(appModels));

/**
 * Test suite for User CRUD operations.
 * This suite includes tests for creating, retrieving, updating, and deleting users.
 * Each test case sends HTTP requests to the API endpoints and verifies the responses.
 */

describe('User CRUD', () => {
  let userId = '';

  it('should create a new user', async () => {
    const response = await request(app).post('/api/user').send({
      name: 'roberto',
      password: 'revolucionario2025',
      id_role: 2,
      id_department: '24cc863c-2969-49a3-ac60-8db75a3d3b35'
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
