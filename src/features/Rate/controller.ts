import { IRateModel } from '../Interfaces/IRateModel';
import {Request , Response} from 'express';
import { validate, validateUpdate } from '../../utils';
import { rateSchema } from './utils';

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
      const createdRate = await this.rateModel.create(req.body);
      res.status(200).json(createdRate);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allRates = await this.rateModel.getAll();
      if(allRates === null) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      res.json(allRates);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user } = req.params;
      const rate = await this.rateModel.getById(id_technician, id_user);
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
      const updatedRate = await this.rateModel.update(id_technician, id_user, req.body);
      if (!updatedRate) {
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      res.json(updatedRate);
    } catch (err) {
      res.status(400).send({ 'An error has occurred': err });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_user } = req.params;

      const rate = await this.rateModel.getById(id_technician, id_user);

      if(!rate){
        res.status(404).json({ message: 'Rate not found' });
        return;
      }
      await this.rateModel.delete(id_technician,id_user);
      res.status(200).json({ message: 'Rate deleted successfully' });
    } catch (err) {
      res.status(400).json({ 'An error has occurred': err });
    }
  }
}