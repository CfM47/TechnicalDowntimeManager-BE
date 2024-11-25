import { Router } from 'express';
import { userController } from '../../globals';

export const userRouter = () => {
  const router = Router();
  router.route("/")
    .post(userController.create)
    .get(userController.getAll);
  router.route("/:id")
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete);
  return router
}