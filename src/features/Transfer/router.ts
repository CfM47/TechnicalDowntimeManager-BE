import { Router } from 'express';
import { ITransferModel } from '../../Interfaces/ITransferModel';
import { TransferController } from './controller';



/**
 * Creates a router for transfer-related routes.
 *
 * @param transferModel - The transfer model to be used by the controller.
 * @returns The configured router.
 */
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