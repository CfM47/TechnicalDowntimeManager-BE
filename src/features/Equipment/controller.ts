import { IEquipmentModel } from '../Interfaces/IEquipmentModel';
import { Request, Response } from 'express';
import { ErrorMessage, validate, validateUpdate } from '../../utils';
import { EquipmentQuery, EquipmentQueryBuilder, equipmentSchema } from './utils';
import { Equipment, NewEquipment } from '../../db/schemas/equipment';
import crypto from 'node:crypto';

export class EquipmentController {
  equipmentModel: IEquipmentModel;
  constructor(equipmentModel: IEquipmentModel) {
    this.equipmentModel = equipmentModel;
  }

  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, equipmentSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      //TODO Verify if equipment department exist before insert
      const equipmentData: NewEquipment = {
        ...result.data
      };
      const newEquipment = await this.equipmentModel.create(equipmentData);
      res.status(201).json(newEquipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allEquipments = await this.equipmentModel.getAll();
      res.status(200).json(allEquipments);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const equipmentQuery = { id: id };
      const filter = EquipmentQueryBuilder(equipmentQuery);
      const equipment = await this.equipmentModel.getById(filter);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      res.status(200).json(equipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, equipmentSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const equipmentData: Partial<Equipment> = { ...result.data };
      const equipmentQuery : EquipmentQuery = { id: id };
      const filter = EquipmentQueryBuilder(equipmentQuery);
      const equipment = await this.equipmentModel.getById(filter);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      const updatedEquipment = await this.equipmentModel.update(filter, equipmentData);
      res.status(200).json(updatedEquipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const equipmentQuery : EquipmentQuery = { id: id };
      const filter = EquipmentQueryBuilder(equipmentQuery);
      const equipment = await this.equipmentModel.getById(filter);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      await this.equipmentModel.delete(filter);
      res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
