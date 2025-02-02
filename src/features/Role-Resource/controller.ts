import { Request, Response } from 'express';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { validate, validatePagination, validateUpdate } from '../../utils';
import { roleResourceSchema, RoleResourceQuery } from './utils';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';

/**
 * Controller class for handling CRUD operations on RoleResource entities.
 *
 * This class provides methods to create, retrieve, update, and delete role resources.
 * Each method interacts with the `IRoleResourceModel` to perform the necessary database operations.
 */
export class RoleResourceController {
  roleResourceModel: IRoleResourceModel;
  roleModel: IRoleModel;
  resourceModel: IResourceModel;

  constructor(
    roleResourceModel: IRoleResourceModel,
    roleModel: IRoleModel,
    resourceModel: IResourceModel
  ) {
    this.roleResourceModel = roleResourceModel;
    this.roleModel = roleModel;
    this.resourceModel = resourceModel;
  }

  /**
   * Creates a new role resource.
   *
   * @param req - The request object containing the role resource data.
   * @param res - The response object to send the result.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, roleResourceSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const createdRoleResource = await this.roleResourceModel.create(result.data);
      res.status(200).json(createdRoleResource);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Retrieves all role resources based on the provided filter.
   *
   * @param req - The request object containing the filter criteria.
   * @param res - The response object to send the result.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: RoleResourceQuery = query;
      const pagination = validatePagination(page, size);
      const allRoleResources = await this.roleResourceModel.getAll(filter, pagination);
      res.json(allRoleResources);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Retrieves a role resource by its ID.
   *
   * @param req - The request object containing the role resource ID.
   * @param res - The response object to send the result.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const { role_id, resource_id } = req.params;
      const roleResourceQuery: RoleResourceQuery = { role_id, resource_id };

      const roleResourceFound = await this.roleResourceModel.getById(roleResourceQuery);

      if (roleResourceFound) {
        res.status(200).json(roleResourceFound);
      } else {
        res.status(404).json({ message: 'Role resource not found', role_id, resource_id });
      }
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Updates a role resource by its ID.
   *
   * @param req - The request object containing the role resource ID and update data.
   * @param res - The response object to send the result.
   */
  update = async (req: Request, res: Response) => {
    try {
      const { role_id, resource_id } = req.params;
      const result = validateUpdate(req.body, roleResourceSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const roleResourceQuery: RoleResourceQuery = { role_id, resource_id };
      const roleResourceFound = await this.roleResourceModel.getById(roleResourceQuery);

      if (!roleResourceFound) {
        res.status(404).json({ message: 'Role resource not found' });
        return;
      }

      const data = result.data;

      if (data.role_id) {
        const role = await this.roleResourceModel.getById({ role_id: data.role_id });
        if (!role) {
          res.status(404).json({ message: 'Role not found' });
          return;
        }
      }

      if (data.resource_id) {
        const resource = await this.roleResourceModel.getById({ resource_id: data.resource_id });
        if (!resource) {
          res.status(404).json({ message: 'Resource not found' });
          return;
        }
      }

      const updatedRoleResource = await this.roleResourceModel.update(
        roleResourceQuery,
        result.data
      );
      res.json(updatedRoleResource);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Deletes a role resource by its ID.
   *
   * @param req - The request object containing the role resource ID.
   * @param res - The response object to send the result.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { role_id, resource_id } = req.params;
      const roleResourceQuery: RoleResourceQuery = { role_id, resource_id };

      const roleResourceFound = await this.roleResourceModel.getById(roleResourceQuery);

      if (!roleResourceFound) {
        res.status(404).json({ message: 'Role resource not found' });
        return;
      }
      await this.roleResourceModel.delete(roleResourceQuery);
      res.status(200).json({ message: 'Role resource deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'An error has occurred', error: err });
    }
  };
}
