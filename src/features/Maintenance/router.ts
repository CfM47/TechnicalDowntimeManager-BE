import { Router } from 'express';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { MaintenanceController } from './controller';

/**
 * Creates a router for maintenance-related routes.
 *
 * This function sets up the routes for creating, retrieving, updating, and deleting maintenance records.
 *
 * @param maintenanceModel - The model used for maintenance operations.
 * @returns The configured router.
 */
export const maintenanceRouter = (maintenanceModel: IMaintenanceModel) => {
  const router = Router();

  const maintenanceController = new MaintenanceController(maintenanceModel);

  router.route('/').post(maintenanceController.create).get(maintenanceController.getAll);

  router
    .route('/:id_technician/:id_equipment/:date')
    .get(maintenanceController.getById)
    .put(maintenanceController.update)
    .delete(maintenanceController.delete);

  return router;
};