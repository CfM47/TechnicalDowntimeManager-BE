import { Request, Response } from 'express';
import { DepartmentQuery, DepartmentQueryBuilder, departmentSchema } from './utils';
import { ErrorMessage, validate, validateUpdate } from '../../utils';
import { IDepartmentModel } from '../Interfaces/IDepartmentModel';
import { NewDepartment, Department } from '../../db/schemas/department';

export class DepartmentController {
  departmentModel: IDepartmentModel;

  constructor(departmentModel: IDepartmentModel) {
    this.departmentModel = departmentModel;
  }
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

  getAll = async (req: Request, res: Response) => {
    try {
      const allDepartments = await this.departmentModel.getAll();
      res.status(200).json(allDepartments);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery : DepartmentQuery = { id: id};
      const filter = DepartmentQueryBuilder(departmentQuery);

      const existDepartment = await this.departmentModel.getById(filter);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      res.status(200).json(existDepartment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery : DepartmentQuery = { id: id};
      const filter = DepartmentQueryBuilder(departmentQuery);

      const result = validateUpdate(req.body, departmentSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const departmentData: Partial<Department> = { ...result.data };

      const existDepartment = await this.departmentModel.getById(filter);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      const updatedDepartment = await this.departmentModel.update(filter, departmentData);
      res.status(200).json(updatedDepartment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const departmentQuery : DepartmentQuery = { id: id};
      const filter = DepartmentQueryBuilder(departmentQuery);

      const existDepartment = await this.departmentModel.getById(filter);
      if (!existDepartment) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      await this.departmentModel.delete(filter);
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}