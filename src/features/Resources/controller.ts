import { Request, Response } from 'express';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { ErrorMessage, Pagination, validate, validatePagination } from '../../utils';
import { NewResource, Resource } from './schema';
import { ResourceQuery, resourceSchema } from './utils';

export class ResourceController {
  resourceModel: IResourceModel;

  constructor(resourceModel: IResourceModel) {
    this.resourceModel = resourceModel;
  }

  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, resourceSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const resourceData: NewResource = {
        ...result.data
      };
      const newResource = await this.resourceModel.create(resourceData);
      res.status(200).json(newResource);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const filter: ResourceQuery = query;
      const allResources = await this.resourceModel.getAll(filter, pagination);
      res.status(200).json(allResources);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const resource = await this.resourceModel.getById({ id });
      if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }
      res.status(200).json(resource);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = validate(req.body, resourceSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const resourceData: Partial<Resource> = {
        ...result.data
      };
      const updatedResource = await this.resourceModel.update({ id }, resourceData);
      res.status(200).json(updatedResource);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existsResource = await this.resourceModel.getById({ id });
      if (!existsResource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }
      await this.resourceModel.delete({ id });
      res.status(200).json({ message: 'Resource deleted succesfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
