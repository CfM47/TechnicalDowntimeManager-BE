import { Router } from 'express';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { EquipmentController } from './controller';


/**
 * Creates a router for equipment-related routes.
 *
 * This function sets up the routes for creating, retrieving, updating, and deleting
 * equipment records. It uses the provided equipment model to instantiate the controller
 * and define the route handlers.
 *
 * @param equipmentModel - The equipment model to be used by the controller.
 * @returns The configured router.
 */
export const equipmentRouter = (equipmentModel: IEquipmentModel) => {
  const router = Router();

  const equipmentController = new EquipmentController(equipmentModel);

  router.route('/').post(equipmentController.create).get(equipmentController.getAll);
  router
    .route('/:id')
    .get(equipmentController.getById)
    .put(equipmentController.update)
    .delete(equipmentController.delete);
  return router;
};
