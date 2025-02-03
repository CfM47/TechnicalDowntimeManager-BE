import { IRateModel } from '../../Interfaces/IRateModel';
import { Request, Response } from 'express';
import { validate, validatePagination, validateUpdate } from '../../utils';
import { RateQuery, rateSchema } from './utils';
import { IUserModel } from '../../Interfaces/IUserModel';

/**
 * RateController is responsible for managing operations related to rates, including creating,
 * fetching, updating, and deleting rates in the system. It interacts with rate and user models
 * to perform these operations and handles request and response objects.
 */
export class RateController {
  rateModel: IRateModel;
  userModel: IUserModel;

  constructor(rateModel: IRateModel, userModel: IUserModel) {
    this.rateModel = rateModel;
    this.userModel = userModel;
  }

  /**
   * Creates a new rate.
   *
   * @param req - The request object containing the rate data.
   * @param res - The response object to send the result.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, rateSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const data = result.data;

      if (data.id_technician == data.id_user) {
        res.status(400).json({ message: 'The technician and user id are the same' });
        return;
      }

      const technician = await this.userModel.getById({ id: data.id_technician });
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      if (technician.role !== 'Técnico') {
        res.status(400).json({ message: 'The technician user is not a technician' });
        return;
      }

      const user = await this.userModel.getById({ id: data.id_user });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const createdRate = await this.rateModel.create(result.data);
      res.status(200).json(createdRate);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Retrieves all rates based on the provided filter.
   *
   * @param req - The request object containing the filter criteria.
   * @param res - The response object to send the result.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, orderBy, ...query } = req.query;
      const filter: RateQuery = query;
      const pagination = validatePagination(page, size);
      const allRates = await this.rateModel.getAll(filter, pagination, orderBy as string);
      res.json(allRates);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Retrieves a rate by its ID.
   *
   * @param req - The request object containing the rate ID.
   * @param res - The response object to send the result.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const rateQuery: RateQuery = { id_technician, id_user, date };

      const rateFound = await this.rateModel.getById(rateQuery);

      if (rateFound) {
        res.status(200).json(rateFound);
      } else {
        res.status(404).json({ message: 'Rate not found', id_technician, id_user });
      }
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Updates a rate by its ID.
   *
   * @param req - The request object containing the rate ID and update data.
   * @param res - The response object to send the result.
   */
  update = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const result = validateUpdate(req.body, rateSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const rateQuery: RateQuery = { id_technician, id_user, date };
      const rateFound = await this.rateModel.getById(rateQuery);

      if (!rateFound) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }

      const data = result.data;

      if (data.id_technician) {
        const technician = await this.userModel.getById({ id: data.id_technician });
        if (!technician) {
          res.status(404).json({ message: 'Technician not found' });
          return;
        }
        if (technician.role !== 'Técnico') {
          res.status(400).json({ message: 'The technician user is not a technician' });
          return;
        }
      }

      if (data.id_user) {
        const user = await this.userModel.getById({ id: data.id_user });
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
      }

      const id_1 = data.id_technician ? data.id_technician : id_technician;
      const id_2 = data.id_user ? data.id_user : id_user;

      if (id_1 == id_2) {
        res.status(400).json({ message: 'The technician and user id are the same' });
        return;
      }

      const updatedRate = await this.rateModel.update(rateQuery, result.data);

      res.json(updatedRate);
    } catch (err) {
      res.status(400).send({ message: 'An error has occurred', error: err });
    }
  };

  /**
   * Deletes a rate by its ID.
   *
   * @param req - The request object containing the rate ID.
   * @param res - The response object to send the result.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const rateQuery: RateQuery = { id_technician, id_user, date };

      const rateFound = await this.rateModel.getById(rateQuery);

      if (!rateFound) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      await this.rateModel.delete(rateQuery);
      res.status(200).json({ message: 'Rate deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'An error has occurred', error: err });
    }
  };
}
