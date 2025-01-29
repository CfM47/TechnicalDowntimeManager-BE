import request from 'supertest';
import testingApp from '../../../test/testingApp';

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
    const response = await request(testingApp).post('/api/rate').send({
      id_technician: 'af4685e7-87ef-4a82-9e88-7155be87f899',
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
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
    const response = await request(testingApp).get('/api/rate');
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for retrieving a rate by ID.
   * Sends a GET request to retrieve a rate by its ID and verifies the response status.
   */
  it('should get rate by ID', async () => {
    const response = await request(testingApp).get(`/api/rate/${id_technician}/${id_user}/${date}`);
    expect(response.status).toEqual(200);
  });

  it('should return an error for invalid user ID', async () => {
    const response = await request(testingApp).get(
      `/api/rate/af4685e7-87ef-4a82-9e88-7155be87f899/02d6ddd9-7f7e-4c60-8c2d-79cba69736b7/${date}`
    );
    expect(response.status).toEqual(404);
  });

  it('should return an error for invalid parameters in update a rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 'cuatro' });
    expect(response.status).toEqual(400);
  });

  it('should return an error for invalid parameters in update a rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ comment: 456 });
    expect(response.status).toEqual(400);
  });

  it('should return 400 for creating a rate with missing fields', async () => {
    const response = await request(testingApp).post('/api/rate/').send({
      id_user: '9f6dbbd9-3a80-4138-8f06-c467aec3f946',
      score: 5,
      comment: 'Excellent service'
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for handling errors when creating a new rate with invalid data.
   * Sends a POST request with invalid data and verifies the response status.
   */
  it('should return an error for invalid data', async () => {
    const response = await request(testingApp).post('/api/rate').send({
      id_technician: '',
      id_user: '',
      score: -1,
      comment: ''
    });
    expect(response.status).toEqual(400);
  });

  /**
   * Test case for updating a rate by ID.
   * Sends a PUT request to update a rate by its ID and verifies the response status.
   */
  it('should update rate by ID', async () => {
    const response = await request(testingApp)
      .put(`/api/rate/${id_technician}/${id_user}/${date}`)
      .send({ score: 4 });
    expect(response.status).toEqual(200);
  });

  /**
   * Test case for deleting a rate by ID.
   * Sends a DELETE request to delete a rate by its ID and verifies the response status.
   */
  it('should delete rate by ID', async () => {
    const response = await request(testingApp).delete(
      `/api/rate/${id_technician}/${id_user}/${date}`
    );
    expect(response.status).toEqual(200);
  });
});
