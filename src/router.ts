import { Router } from 'express';
import { userRouter } from './features/User/router';
import { technicianRouter } from './features/Technician/router';
import { Models } from './utils';

export const appRouter = (appModels : Models) => {
  const router = Router();
  router.use('/user', userRouter(appModels.userModel));
  router.use('/technician', technicianRouter(appModels.technicianModel, appModels.userModel));
  return router;
};
