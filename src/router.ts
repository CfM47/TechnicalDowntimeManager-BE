import { Router } from 'express';
import { userRouter } from './features/User/router';
import { technicianRouter } from './features/Technician/router';
import { Models } from './utils';
import { equipmentRouter } from './features/Equipment/router';
import { rateRouter } from './features/Rate/router';

export const appRouter = (appModels: Models) => {
  const router = Router();
  router.use('/user', userRouter(appModels.userModel));
  router.use('/technician', technicianRouter(appModels.technicianModel, appModels.userModel));
  router.use('/equipment', equipmentRouter(appModels.equipmentModel));
  router.use('/rate', rateRouter(appModels.rateModel));
  return router;
};
