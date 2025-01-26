import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { TechnicianController } from './controller';

export const technicianRouter = (technicianModel: ITechnicianModel, userModel: IUserModel) => {
  const router = Router();

  const technicianController = new TechnicianController(userModel, technicianModel);

  router.route('/').post(technicianController.create);
  router.route('/').get(technicianController.getAll);
  router.route('/:id').get(technicianController.getById);
  router.route('/:id').put(technicianController.update);
  router.route('/:id').delete(technicianController.delete);
  return router;
};
