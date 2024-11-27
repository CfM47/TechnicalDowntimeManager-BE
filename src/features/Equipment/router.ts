import { Router } from 'express';
import { IEquipmentModel } from '../Interfaces/IEquipmentModel';
import { EquipmentController } from './controller';

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
