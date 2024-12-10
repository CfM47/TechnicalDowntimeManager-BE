import { Router } from 'express';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { MaintenanceController } from './controller';

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
