import { Router } from 'express';
import { userRouter } from './features/User/router';
import { technicianRouter } from './features/Technician/router';
import { Models } from './utils';
import { equipmentRouter } from './features/Equipment/router';
import { rateRouter } from './features/Rate/router';
import { roleRouter } from './features/Role/router';
import { transferRouter } from './features/Transfer/router';
import { departmentRouter } from './features/Department/router';
import { downtimeRouter } from './features/Downtime/router';

export const appRouter = (appModels: Models) => {
  const router = Router();
  router.use('/user', userRouter(appModels.userModel));
  router.use('/technician', technicianRouter(appModels.technicianModel, appModels.userModel));
  router.use('/equipment', equipmentRouter(appModels.equipmentModel));
  router.use('/rate', rateRouter(appModels.rateModel));
  router.use('/role',roleRouter(appModels.roleModel));
  router.use('/department',departmentRouter(appModels.departmentModel));
  router.use('/transfer', transferRouter(appModels.transferModel));
  router.use('/downtime', downtimeRouter(appModels.downtimeModel));
  return router;
};