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
import { maintenanceRouter } from './features/Maintenance/router';
import { authRouter } from './features/Auth/router';
import { getAllFormats } from './core/utils';

/**
 * Configures and returns the main application router with all feature routes.
 *
 * @param {Models} appModels - The models used by the application.
 * @returns {Router} The configured router.
 */
export const appRouter = (appModels: Models): Router => {
  const router = Router();
  router.use(
    '/user',
    userRouter(
      appModels.userModel,
      appModels.technicianModel,
      appModels.departmentModel,
      appModels.roleModel
    )
  );
  router.use('/technician', technicianRouter(appModels.technicianModel, appModels.userModel));
  router.use('/equipment', equipmentRouter(appModels.equipmentModel, appModels.departmentModel));
  router.use(
    '/rate',
    rateRouter(appModels.rateModel, appModels.userModel, appModels.technicianModel)
  );
  router.use('/role', roleRouter(appModels.roleModel));
  router.use('/department', departmentRouter(appModels.departmentModel));
  router.use(
    '/transfer',
    transferRouter(
      appModels.transferModel,
      appModels.userModel,
      appModels.equipmentModel,
      appModels.departmentModel
    )
  );
  router.use(
    '/maintenance',
    maintenanceRouter(
      appModels.maintenanceModel,
      appModels.technicianModel,
      appModels.equipmentModel
    )
  );
  router.use(
    '/downtime',
    downtimeRouter(
      appModels.downtimeModel,
      appModels.departmentModel,
      appModels.equipmentModel,
      appModels.userModel
    )
  );
  router.use('/auth', authRouter(appModels.userModel));
  router.get('/available-export-formats', getAllFormats);
  return router;
};
