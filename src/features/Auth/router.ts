import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { AuthController } from './controller';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';

/**
 * Creates and configures the authentication router.
 *
 * This function sets up the router for handling authentication-related routes,
 * such as signing in. It initializes the `AuthController` with the provided
 * user model and defines the routes.
 *
 * @param userModel - The user model to be used by the authentication controller.
 * @returns The configured authentication router.
 */
export const authRouter = (
  userModel: IUserModel,
  roleModel: IRoleModel,
  resourceModel: IResourceModel,
  roleResourceModel: IRoleResourceModel
) => {
  const router = Router();
  const authController = new AuthController(userModel, roleModel, resourceModel, roleResourceModel);

  router.post('/signin', authController.signin).post('/authorize', authController.authorize);

  return router;
};
