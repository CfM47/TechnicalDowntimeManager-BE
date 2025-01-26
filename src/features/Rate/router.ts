import { Router } from 'express';
import { IRateModel } from '../../Interfaces/IRateModel';
import { RateController } from './controller';

/**
 * Creates a router for handling rate-related routes.
 *
 * @param rateModel - The model instance for interacting with rate data.
 * @returns An Express router configured with rate routes.
 */
export const rateRouter = (rateModel: IRateModel) => {
  const router = Router();
  const rateController = new RateController(rateModel);
  router.route('/').post(rateController.create).get(rateController.getAll);
  router
    .route('/:id_technician/:id_user/:date')
    .get(rateController.getById)
    .put(rateController.update)
    .delete(rateController.delete);
  return router;
};
