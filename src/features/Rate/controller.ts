import { IRateModel } from '../../Interfaces/IRateModel';
import { Request, Response } from 'express';
import { validate, validateUpdate } from '../../utils';
import { RateQuery, rateSchema } from './utils';

/**
 * Controller class for handling CRUD operations on Rate entities.
 *
 * This class provides methods to create, retrieve, update, and delete rates.
 * Each method interacts with the `IRateModel` to perform the necessary database operations.
 */
export class RateController {
  rateModel: IRateModel;

  constructor(rateModel: IRateModel) {
    this.rateModel = rateModel;
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
      const filter: RateQuery = req.query;
      const allRates = await this.rateModel.getAll(filter);
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
