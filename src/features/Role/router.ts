import { Router } from 'express';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { RoleController } from './controller';

export const roleRouter = (roleModel: IRoleModel) => {
  const router = Router();

  const roleController = new RoleController(roleModel);

  router.route('/').post(roleController.create).get(roleController.getAll);
  router
    .route('/:id')
    .get(roleController.getById)
    .put(roleController.update)
    .delete(roleController.delete);
  return router;
};
