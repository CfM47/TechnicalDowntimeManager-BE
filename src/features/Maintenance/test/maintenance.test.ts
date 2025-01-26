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
 * Test suite for Maintenance CRUD operations.
 */
describe('Maintenance CRUD', () => {
  let id_technician = '';
  let id_equipment = '';
  let date = '';

  /**
   * Test case for creating a new maintenance record.
   */
  it('should create a new maintenance', async () => {
    const response = await request(app).post('/api/maintenance').send({
      id_technician: 'add0921a-6979-46a3-a070-5f41a9ac08f7',
      type: 'Scheduled',
      cost: 12,
      id_equipment: 'a3739594-c850-4669-9c5f-5b43d1253507'
    });
    expect(response.status).toEqual(201);
    id_equipment = response.body.equipment.id;
    id_technician = response.body.technician.id;
    date = response.body.date;
  });

  /**
   * Test case for retrieving all maintenance records.
   */
  it('should get all maintenance records', async () => {
    const response = await request(app).get('/api/maintenance');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for retrieving a maintenance record by ID.
   */
  it('should get maintenance by ID', async () => {
    const response = await request(app).get(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for updating a maintenance record by ID.
   */
  it('should update maintenance by ID', async () => {
    const response = await request(app)
      .put(`/api/maintenance/${id_technician}/${id_equipment}/${date}`)
      .send({ cost: 20 });
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for deleting a maintenance record by ID.
   */
  it('should delete maintenance by ID', async () => {
    const response = await request(app).delete(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });
});
