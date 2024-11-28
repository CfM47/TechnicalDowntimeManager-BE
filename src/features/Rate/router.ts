import { Router } from 'Express';
import { IRateModel } from '../Interfaces/IRateModel';
import { RateController } from './controller';


export const rateRouter = (rateModel: IRateModel) => {
  const router = Router();
  const rateController = new RateController(rateModel);
  router.route('/').post(rateController.create).get(rateController.getAll);
  router
    .route('/:id_technician/:id_user')
    .get(rateController.getById)
    .put(rateController.update)
    .delete(rateController.delete);
  return router;
};
