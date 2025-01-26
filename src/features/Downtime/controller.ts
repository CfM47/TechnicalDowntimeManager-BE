import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { Request, Response } from 'express';
import { DowntimeQuery, downtimeSchema } from './utils';
import { NewDowntime, Downtime } from './schema';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';

export class DowntimeController {
  downtimeModel: IDowntimeModel;
  constructor(downtimeModel: IDowntimeModel) {
    this.downtimeModel = downtimeModel;
  }
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, downtimeSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const downtimeData: NewDowntime = {
        ...result.data
      };
      const newDowntime = await this.downtimeModel.create(downtimeData);
      res.status(201).json(newDowntime);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: DowntimeQuery = query;
      const pagination: Pagination = validatePagination(page, size);
      const allDowntimes = await this.downtimeModel.getAll(filter, pagination);
      res.status(200).json(allDowntimes);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };

      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      res.status(200).json(downtimeFound);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };
      const result = validateUpdate(req.body, downtimeSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const downtimeData: Partial<Downtime> = { ...result.data };
      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      const updatedDowntime = await this.downtimeModel.update(downtimeQuery, downtimeData);
      res.status(200).json(updatedDowntime);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };
      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      await this.downtimeModel.delete(downtimeQuery);
      res.status(200).json({ message: 'Downtime deleted' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
