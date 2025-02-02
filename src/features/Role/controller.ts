import { Request, Response } from 'express';
import { RoleQuery, roleSchema } from './utils';
import { ErrorMessage, validate, validatePagination, validateUpdate } from '../../utils';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { NewRole, Role } from './schema';

export class RoleController {
  roleModel: IRoleModel;

  constructor(roleModel: IRoleModel) {
    this.roleModel = roleModel;
  }
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, roleSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const roleData: NewRole = {
        ...result.data
      };
      const newRole = await this.roleModel.create(roleData);
      res.status(200).json(newRole);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, orderBy, ...query } = req.query;
      const filter: RoleQuery = query;
      const pagination = validatePagination(page, size);
      const allRoles = await this.roleModel.getAll(filter, pagination, orderBy as string);
      res.status(200).json(allRoles);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const roleQuery: RoleQuery = { id: parseInt(id) };

      const existRole = await this.roleModel.getById(roleQuery);
      if (!existRole) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
      res.status(200).json(existRole);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const roleQuery: RoleQuery = { id: parseInt(id) };

      const result = validateUpdate(req.body, roleSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const roleData: Partial<Role> = { ...result.data };

      const existRole = await this.roleModel.getById(roleQuery);
      if (!existRole) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
      const updatedRole = await this.roleModel.update(roleQuery, roleData);
      res.status(200).json(updatedRole);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const roleQuery: RoleQuery = { id: parseInt(id) };

      const existRole = await this.roleModel.getById(roleQuery);
      if (!existRole) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
      await this.roleModel.delete(roleQuery);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
