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

describe('Maintenance CRUD', () => {
  let id_technician = '';
  let id_equipment = '';
  let date = '';
  it('should create a new maintenance', async () => {
    const response = await request(app).post('/api/maintenance').send({
      id_technician: '61860cce-cd6f-4e07-8db3-37527e32e671',
      type: 'Scheduled',
      cost: 12,
      id_equipment: '0a87207a-3486-445b-97eb-65d14fda2249'
    });
    expect(response.status).toEqual(201);
    id_equipment = response.body.id_equipment;
    id_technician = response.body.id_technician;
    date = response.body.date;
  });

  it('should get all maintenance records', async () => {
    const response = await request(app).get('/api/maintenance');
    expect(response.status).toEqual(200);
  });

  it('should get maintenance by ID', async () => {
    const response = await request(app).get(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });

  it('should update maintenance by ID', async () => {
    const response = await request(app)
      .put(`/api/maintenance/${id_technician}/${id_equipment}/${date}`)
      .send({ cost: 20 });
    expect(response.status).toEqual(200);
  });

  it('should delete maintenance by ID', async () => {
    const response = await request(app).delete(
      `/api/maintenance/${id_technician}/${id_equipment}/${date}`
    );
    expect(response.status).toEqual(200);
  });
});
