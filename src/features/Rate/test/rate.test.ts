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

/**
 * Test suite for CRUD operations on the `Rate` resource.
 */
describe('Rate CRUD', () => {
  let id_technician = '';
  let id_user = '';
  let date = '';

  /**
   * Test case for creating a new rate.
   * Sends a POST request to create a new rate and verifies the response status.
   */
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

  /**
   * Test case for retrieving all rates.
   * Sends a GET request to retrieve all rates and verifies the response status.
   */
  it('should get all rates', async () => {
    const response = await request(app).get('/api/rate');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for retrieving a rate by ID.
   * Sends a GET request to retrieve a rate by its ID and verifies the response status.
   */
  it('should get rate by ID', async () => {
    const response = await request(app).get(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for updating a rate by ID.
   * Sends a PUT request to update a rate by its ID and verifies the response status.
   */
  it('should update rate by ID', async () => {
    const response = await request(app)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 4 });
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for deleting a rate by ID.
   * Sends a DELETE request to delete a rate by its ID and verifies the response status.
   */
  it('should delete rate by ID', async () => {
    const response = await request(app).delete(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });
});