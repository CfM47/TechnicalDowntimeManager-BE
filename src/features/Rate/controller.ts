import { IRateModel } from '../../Interfaces/IRateModel';
import { Request, Response } from 'express';
import { validate, validateUpdate } from '../../utils';
import { RateQuery, rateSchema } from './utils';

export class RateController {
  rateModel: IRateModel;

  constructor(rateModel: IRateModel) {
    this.rateModel = rateModel;
  }

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
      res.status(400).send({ 'An error has occurred': err });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const filter: RateQuery = req.query;
      const allRates = await this.rateModel.getAll(filter);
      res.json(allRates);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const rateQuery: RateQuery = { id_technician: id_technician, id_user: id_user, date: date };

      const rateFound = await this.rateModel.getById(rateQuery);

      if (rateFound) {
        res.status(200).json(rateFound);
      } else {
        res.status(400).json({ 'Rate not found': { id_technician, id_user } });
      }
    } catch (err) {
      res.status(400).send({ 'An error has occurred candela s': err });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const result = validateUpdate(req.body, rateSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const rateQuery: RateQuery = { id_technician: id_technician, id_user: id_user, date: date };
      const rateFound = await this.rateModel.getById(rateQuery);

      if (!rateFound) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      const updatedRate = await this.rateModel.update(rateQuery, result.data);

      res.json(updatedRate);
    } catch (err) {
      res.status(400).send({ 'An error has occurred here': err });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user, date } = req.params;
      const rateQuery: RateQuery = { id_technician: id_technician, id_user: id_user, date: date };

      const rateFound = await this.rateModel.getById(rateQuery);

      if (!rateFound) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      await this.rateModel.delete(rateQuery);
      res.status(200).json({ message: 'Rate deleted successfully' });
    } catch (err) {
      res.status(400).json({ 'An error has occurred': err });
    }
  };
}
