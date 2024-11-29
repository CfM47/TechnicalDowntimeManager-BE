import { IRateModel } from '../Interfaces/IRateModel';
import {Request , Response} from 'express';
import { validate, validateUpdate } from '../../utils';
import { rateSchema } from './utils';
import { eq, SQL } from 'drizzle-orm';
import { technician } from '../../db/schemas/technician';
import { user } from '../../db/schemas/user';

export class RateController {
  rateModel : IRateModel;

  constructor(rateModel : IRateModel){
    this.rateModel = rateModel;
  }

 create = async (req: Request, res: Response) => {
  try {
    const result = validate(req.body, rateSchema);

    if (!result.success) {
      res.status(400).json({ message: JSON.parse(result.error.message) });
      return;
    }

    const { id_technician, id_user } = result.data;
    const keys : SQL[] = [];
    keys.push(eq(technician.id_user, id_technician));
    keys.push(eq(user.id, id_user));

    // Check if the rate already exists
    const existingRate = await this.rateModel.getById(keys);
    if (existingRate) {
      res.status(400).json({ message: 'Rate already exists for this technician and user' });
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
      const allRates = await this.rateModel.getAll();
      res.json(allRates);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  }

  getById = async (req: Request, res: Response) => {
  try {
    const { id_technician, id_user } = req.params;
    const keys: SQL [] = [];
    keys.push(eq(technician.id_user, id_technician));
    keys.push(eq(user.id, id_user));
    const rate = await this.rateModel.getById(keys);
    if (rate) {
      res.status(200).json(rate);
    } else {
      res.status(404).json({ 'Rate not found': { id_technician, id_user } });
    }
  } catch (err) {
    res.status(400).send({ 'An error has occurred': err });
  }
};

  update = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user } = req.params;
      const result = validateUpdate(req.body, rateSchema);

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const keys: SQL[] = [];

      keys.push(eq(technician.id_user, id_technician));
      keys.push(eq(user.id, id_user));

      const rate = await this.rateModel.getById(keys);

      if(!rate){
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      const updatedRate = await this.rateModel.update(keys, result.data);

      res.json(updatedRate);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user } = req.params;
      const keys: SQL[] = [];
      keys.push(eq(technician.id_user, id_technician));
      keys.push(eq(user.id, id_user));

      const rate = await this.rateModel.getById(keys);

      if(!rate){
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      await this.rateModel.delete(keys);
      res.status(200).json({ message: 'Rate deleted successfully' });
    } catch (err) {
      res.status(400).json({ 'An error has occurred': err });
    }
  }
}