import { Router } from 'express';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { RoleResourceController } from './controller';
import { AuthController } from '../Auth/controller';
import { Role } from '../../enums';
import { IUserModel } from '../../Interfaces/IUserModel';

export const roleResourceRouter = (
  roleResourceModel: IRoleResourceModel,
  roleModel: IRoleModel,
  resourceModel: IResourceModel,
  userModel: IUserModel
) => {
  const router = Router();
  const controller = new RoleResourceController(roleResourceModel, roleModel, resourceModel);
  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router
    .route('/')
    .post(authController.hasRole({ allowedRoles: [Role.admin] }), controller.create)
    .get(authController.hasRole({ allowedRoles: [Role.admin] }), controller.getAll);
  router
    .route('/:role_id/:resource_id')
    .get(authController.hasRole({ allowedRoles: [Role.admin] }), controller.getById)
    .put(authController.hasRole({ allowedRoles: [Role.admin] }), controller.update)
    .delete(authController.hasRole({ allowedRoles: [Role.admin] }), controller.delete);

  return router;
};
