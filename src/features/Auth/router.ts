import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { AuthController } from './controller';

export const authRouter = (userModel: IUserModel) => {
  const router = Router();
  const authController = new AuthController(userModel);

  router.post('/signin', authController.signin);

  return router;
};
