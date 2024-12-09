import { ITransferModel } from '../../Interfaces/ITransferModel';
import { Request, Response } from 'express';
import { TransferQuery, transferSchema } from './utils';
import { NewTransfer, Transfer } from './schema';
import { ErrorMessage, validate, validateUpdate } from '../../utils';

export class TransferController {
  transferModel: ITransferModel;
  constructor(transferModel: ITransferModel) {
    this.transferModel = transferModel;
  }
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, transferSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const transferData: NewTransfer = {
        ...result.data
      };
      const newTransfer = await this.transferModel.create(transferData);
      res.status(201).json(newTransfer);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allTransfers = await this.transferModel.getAll();
      res.status(200).json(allTransfers);
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
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };

      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }
      res.status(200).json(transferFound);
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
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };

      const result = validateUpdate(req.body, transferSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const transferData: Partial<Transfer> = { ...result.data };
      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }
      const updatedTransfer = await this.transferModel.update(transferQuery, transferData);
      res.status(200).json(updatedTransfer);
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
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };
      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }
      await this.transferModel.delete(transferQuery);
      res.status(200).json({ message: 'Transfer deleted' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
