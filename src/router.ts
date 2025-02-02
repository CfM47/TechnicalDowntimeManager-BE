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
import { resourceRouter } from './features/Resources/router';
import { roleResourceRouter } from './features/Role-Resource/routes';
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
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/technician',
    technicianRouter(
      appModels.technicianModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/equipment',
    equipmentRouter(
      appModels.equipmentModel,
      appModels.departmentModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/rate',
    rateRouter(
      appModels.rateModel,
      appModels.userModel,
      appModels.technicianModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/role',
    roleRouter(
      appModels.roleModel,
      appModels.userModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/department',
    departmentRouter(
      appModels.departmentModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/transfer',
    transferRouter(
      appModels.transferModel,
      appModels.userModel,
      appModels.equipmentModel,
      appModels.departmentModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/maintenance',
    maintenanceRouter(
      appModels.maintenanceModel,
      appModels.technicianModel,
      appModels.equipmentModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/downtime',
    downtimeRouter(
      appModels.downtimeModel,
      appModels.departmentModel,
      appModels.equipmentModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    '/resource',
    resourceRouter(
      appModels.resourceModel,
      appModels.userModel,
      appModels.roleModel,
      appModels.roleResourceModel
    )
  );
  router.use(
    'role-resource',
    roleResourceRouter(
      appModels.roleResourceModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.userModel
    )
  );
  router.use(
    '/auth',
    authRouter(
      appModels.userModel,
      appModels.roleModel,
      appModels.resourceModel,
      appModels.roleResourceModel
    )
  );
  router.get('/available-export-formats', getAllFormats);
  return router;
};
