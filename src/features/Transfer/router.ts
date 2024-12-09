import { Router } from 'express';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { TransferController } from './controller';

export const transferRouter = (transferModel: ITransferModel) => {
  const router = Router();

  const transferController = new TransferController(transferModel);

  router.route('/').post(transferController.create).get(transferController.getAll);

  router
    .route('/:id_sender/:id_receiver/:id_equipment/:date/:id_origin_dep/:id_receiver_dep')
    .get(transferController.getById)
    .put(transferController.update)
    .delete(transferController.delete);

  return router;
};
