import { Router } from 'express';
import { IUserModel } from '../../Interfaces/IUserModel';
import { UserController } from './controller';

export const userRouter = (userModel: IUserModel) => {
  const router = Router();

  const userController = new UserController(userModel);

  router.route('/').post(userController.create).get(userController.getAll);
  router
    .route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete);
  return router;
};
