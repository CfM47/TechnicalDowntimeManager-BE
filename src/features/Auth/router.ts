import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { AuthController } from './controller';

/**
 * Creates and configures an authentication router.
 *
 * @param {IUserModel} userModel - The user model used by the authentication controller for user-related operations.
 * @returns {Router} A configured Express router instance containing authentication routes.
 */
export const authRouter = (userModel: IUserModel) => {
  const router = Router();
  const authController = new AuthController(userModel);

  router.post('/signin', authController.signin);

  return router;
};
