import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { TechnicianController } from './controller';

/**
 * Creates and configures the technician router.
 *
 * @param technicianModel - The technician model to interact with the database.
 * @param userModel - The user model to interact with the database.
 * @returns The configured router for technician routes.
 */
export const technicianRouter = (technicianModel: ITechnicianModel, userModel: IUserModel) => {
  const router = Router();

  const technicianController = new TechnicianController(userModel, technicianModel);

  router.route('/').post(technicianController.create).get(technicianController.getAll);
  router
    .route('/:id')
    .get(technicianController.getById)
    .put(technicianController.update)
    .delete(technicianController.delete);
  return router;
};
