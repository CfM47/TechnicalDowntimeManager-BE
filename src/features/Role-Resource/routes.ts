import { Router } from 'express';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { RoleResourceController } from './controller';

export const roleResourceRouter = (
  roleResourceModel: IRoleResourceModel,
  roleModel: IRoleModel,
  resourceModel: IResourceModel
) => {
  const router = Router();
  const controller = new RoleResourceController(roleResourceModel, roleModel, resourceModel);

  router.route('/').post(controller.create).get(controller.getAll);
  router
    .route('/:role_id/:resource_id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete);

  return router;
};
