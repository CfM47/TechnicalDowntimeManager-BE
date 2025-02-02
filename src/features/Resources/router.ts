import { Router } from 'express';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { ResourceController } from './controller';

export const resourceRouter = (resourceModel: IResourceModel) => {
  const router = Router();

  const resourceController = new ResourceController(resourceModel);

  router.route('/').post(resourceController.create).get(resourceController.getAll);
  router
    .route('/:id')
    .get(resourceController.getById)
    .put(resourceController.update)
    .delete(resourceController.delete);
  return router;
};
