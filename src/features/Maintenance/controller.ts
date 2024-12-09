import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { Request, Response } from 'express';
import { MaintenanceQuery, maintenanceSchema } from './utils';
import { NewMaintenance, Maintenance } from './schema';
import { ErrorMessage, validate, validateUpdate } from '../../utils';

export class MaintenanceController {
  maintenanceModel: IMaintenanceModel;
  constructor(maintenanceModel: IMaintenanceModel) {
    this.maintenanceModel = maintenanceModel;
  }
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, maintenanceSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const maintenanceData: NewMaintenance = {
        ...result.data
      };
      const newMaintenance = await this.maintenanceModel.create(maintenanceData);
      res.status(201).json(newMaintenance);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allMaintenances = await this.maintenanceModel.getAll();
      res.status(200).json(allMaintenances);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id_technician = req.params.id_technician;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician: id_technician,
        id_equipment: id_equipment,
        date: date
      };

      const maintenanceFound = await this.maintenanceModel.getById(maintenanceQuery);
      if (!maintenanceFound) {
        res.status(404).json({ message: 'Maintenance not found' });
        return;
      }
      res.status(200).json(maintenanceFound);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id_technician = req.params.id_technician;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician: id_technician,
        id_equipment: id_equipment,
        date: date
      };

      const result = validateUpdate(req.body, maintenanceSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const maintenanceData: Partial<Maintenance> = { ...result.data };
      const maintenanceFound = await this.maintenanceModel.getById(maintenanceQuery);
      if (!maintenanceFound) {
        res.status(404).json({ message: 'Maintenance not found' });
        return;
      }
      const updatedMaintenance = await this.maintenanceModel.update(
        maintenanceQuery,
        maintenanceData
      );
      res.status(200).json(updatedMaintenance);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id_technician = req.params.id_technician;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician: id_technician,
        id_equipment: id_equipment,
        date: date
      };
      const maintenanceFound = await this.maintenanceModel.getById(maintenanceQuery);
      if (!maintenanceFound) {
        res.status(404).json({ message: 'Maintenance not found' });
        return;
      }
      await this.maintenanceModel.delete(maintenanceQuery);
      res.status(200).json({ message: 'Maintenance deleted' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
