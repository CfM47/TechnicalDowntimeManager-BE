import { Router } from 'express';
import { IDepartmentModel } from '../Interfaces/IDepartmentModel';
import { DepartmentController } from './controller';

export const departmentRouter = (departmentModel: IDepartmentModel) => {
  const router = Router();

  const departmentController = new DepartmentController(departmentModel);

  router.route('/').post(departmentController.create).get(departmentController.getAll);
  router
    .route('/:id')
    .get(departmentController.getById)
    .put(departmentController.update)
    .delete(departmentController.delete);
  return router;
};