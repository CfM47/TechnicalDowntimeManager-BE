import { Router } from 'express';
import { technicianController } from '../../globals';

export const technicianRouter = () => {
  const router = Router();
  router.route('/').post(technicianController.create).get(technicianController.getAll);
  router
    .route('/:id')
    .get(technicianController.getById)
    .put(technicianController.update)
    .delete(technicianController.delete);
  return router;
};
