import { Router } from 'express';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { DowntimeController } from './controller';

export const downtimeRouter = (downtimeModel: IDowntimeModel) => {
  const router = Router();

  const downtimeController = new DowntimeController(downtimeModel);

  router.route('/').post(downtimeController.create).get(downtimeController.getAll);

  router
    .route('/:id_sender/:id_receiver/:id_equipment/:date/:id_dep_receiver')
    .get(downtimeController.getById)
    .put(downtimeController.update)
    .delete(downtimeController.delete);

  return router;
};
