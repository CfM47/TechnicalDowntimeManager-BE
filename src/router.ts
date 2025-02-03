import { Router } from 'express';
import { userRouter } from './features/User/router';
import { technicianRouter } from './features/Technician/router';
import { Models } from './utils';
import { equipmentRouter } from './features/Equipment/router';
import { rateRouter } from './features/Rate/router';
import { transferRouter } from './features/Transfer/router';
import { departmentRouter } from './features/Department/router';
import { downtimeRouter } from './features/Downtime/router';
import { maintenanceRouter } from './features/Maintenance/router';
import { authRouter } from './features/Auth/router';
import { getAllFormats } from './core/utils';

/**
 * Configures and initializes the main application router with specific route handlers.
 *
 * This function sets up multiple sub-routers, each associated with a particular
 * domain or feature of the application (e.g., user management, equipment, transfers,
 * maintenance, etc.). The function accepts an argument containing various models
 * and injects them into the corresponding routers to handle database interactions
 * and business logic.
 *
 * Routes:
 * - `/user`: Handles user-related operations by integrating user, technician,
 *   and department models.
 * - `/technician`: Handles technician-related operations using technician and
 *   user models.
 * - `/equipment`: Manages equipment-related operations with the equipment and
 *   department models.
 * - `/rate`: Manages rate-related functionality using rate and user models.
 * - `/department`: Handles department-based operations with the department model.
 * - `/transfer`: Manages equipment transfer functionality using transfer, user,
 *   equipment, and department models.
 * - `/maintenance`: Handles operations related to maintenance requests using maintenance,
 *   technician, and equipment models.
 * - `/downtime`: Manages downtime-related operations with downtime, department,
 *   equipment, and user models.
 * - `/auth`: Handles user authentication with the user model.
 * - `/available-export-formats`: Provides available data export formats as a GET endpoint.
 *
 * @param {Models} appModels - An object containing the application's data models
 * necessary for initializing route handlers. Each sub-router requires specific
 * models to execute respective operations.
 * @returns {Router} An Express.js Router instance with all routes and middleware configured.
 */
export const appRouter = (appModels: Models): Router => {
  const router = Router();
  router.use(
    '/user',
    userRouter(appModels.userModel, appModels.technicianModel, appModels.departmentModel)
  );
  router.use('/technician', technicianRouter(appModels.technicianModel, appModels.userModel));
  router.use('/equipment', equipmentRouter(appModels.equipmentModel, appModels.departmentModel));
  router.use('/rate', rateRouter(appModels.rateModel, appModels.userModel));
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
