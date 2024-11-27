import { Request, Response } from 'express';
import { technicianSchema } from './utils';
import { ErrorMessage, validate, validateUpdate } from '../../utils';
import { NewTechnician, Technician } from '../../db/schemas/technician';
import { technicianModel, userModel } from '../../globals';
export class TechnicianController {
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, technicianSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const user = await userModel.getById(result.data.id_user);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      const technicianData: NewTechnician = {
        ...result.data
      };
      const newTechnician = await technicianModel.create(technicianData);
      res.status(201).json(newTechnician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allTechnicians = await technicianModel.getAll();
      res.status(200).json(allTechnicians);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technician = await technicianModel.getById(id);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      res.status(200).json(technician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, technicianSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const technicianData: Partial<Technician> = { ...result.data };
      //check if technician exist before update
      const technician = await technicianModel.getById(id);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      const updatedTechnician = await technicianModel.update(id, technicianData);
      res.status(200).json(updatedTechnician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technician = await technicianModel.getById(id);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      await technicianModel.delete(id);
      res.status(200).json({ message: 'Technician deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
