import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { AuthController } from './controller';

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
export const authRouter = (userModel: IUserModel) => {
  const router = Router();
  const authController = new AuthController(userModel);

  router.post('/signin', authController.signin);

  return router;
};
