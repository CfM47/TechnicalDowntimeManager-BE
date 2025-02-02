import { Router } from 'express';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { ResourceController } from './controller';
import { AuthController } from '../Auth/controller';
import { IUserModel } from '../../Interfaces/IUserModel';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { Role } from '../../enums';

export const resourceRouter = (
  resourceModel: IResourceModel,
  userModel: IUserModel,
  roleModel: IRoleModel,
  roleResourceModel: IRoleResourceModel
) => {
  const router = Router();

  const resourceController = new ResourceController(resourceModel);
  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router
    .route('/')
    .post(authController.hasRole({ allowedRoles: [Role.admin] }), resourceController.create)
    .get(authController.hasRole({ allowedRoles: [Role.admin] }), resourceController.getAll);
  router
    .route('/:id')
    .get(authController.hasRole({ allowedRoles: [Role.admin] }), resourceController.getById)
    .put(authController.hasRole({ allowedRoles: [Role.admin] }), resourceController.update)
    .delete(authController.hasRole({ allowedRoles: [Role.admin] }), resourceController.delete);
  return router;
};
