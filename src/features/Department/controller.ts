import { Request, Response } from 'express';
import { DepartmentQuery, departmentSchema } from './utils';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { NewDepartment, Department } from './schema';

/**
 * Controller class for handling CRUD operations on the Department entity.
 */
export class DepartmentController {
  departmentModel: IDepartmentModel;

  constructor(departmentModel: IDepartmentModel) {
    this.departmentModel = departmentModel;
  }

  /**
   * Creates a new department.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, departmentSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const departmentData: NewDepartment = {
        ...result.data
      };
      const newDepartment = await this.departmentModel.create(departmentData);
      res.status(200).json(newDepartment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all departments based on the provided filter.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const filter: DepartmentQuery = query;
      const allDepartments = await this.departmentModel.getAll(filter, pagination);
      res.status(200).json(allDepartments);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a department by its ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery: DepartmentQuery = { id: id };
      const existDepartment = await this.departmentModel.getById(departmentQuery);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      res.status(200).json(existDepartment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates a department by its ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery: DepartmentQuery = { id: id };

      const result = validateUpdate(req.body, departmentSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const departmentData: Partial<Department> = { ...result.data };

      const existDepartment = await this.departmentModel.getById(departmentQuery);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      const updatedDepartment = await this.departmentModel.update(departmentQuery, departmentData);
      res.status(200).json(updatedDepartment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes a department by its ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery: DepartmentQuery = { id: id };

      const existDepartment = await this.departmentModel.getById(departmentQuery);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      await this.departmentModel.delete(departmentQuery);
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
