import { Request, Response } from 'express';
import { TechnicianQuery, TechnicianQueryBuilder, technicianSchema } from './utils';
import { ErrorMessage, validate, validateUpdate } from '../../utils';
import { NewTechnician, Technician } from '../../db/schemas/technician';
import { IUserModel } from '../Interfaces/IUserModel';
import { ITechnicianModel } from '../Interfaces/ITechnicianModel';
import { eq, SQL } from 'drizzle-orm';
import { user } from '../../db/schemas/user';
import { UserQuery, UserQueryBuilder } from '../User/utils';
export class TechnicianController {
  userModel: IUserModel;
  technicianModel: ITechnicianModel;
  constructor(userModel: IUserModel, technicianModel: ITechnicianModel) {
    this.userModel = userModel;
    this.technicianModel = technicianModel;
  }
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, technicianSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const userQuery : UserQuery = { id: result.data.id_user };
      const userFilter = UserQueryBuilder(userQuery);
      const userFound = await this.userModel.getById(userFilter);
      if (!userFound) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      const technicianData: NewTechnician = {
        ...result.data
      };
      const newTechnician = await this.technicianModel.create(technicianData);
      res.status(201).json(newTechnician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const allTechnicians = await this.technicianModel.getAll();
      res.status(200).json(allTechnicians);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technicianQuery : TechnicianQuery = {id_user: id};
      const filter = TechnicianQueryBuilder(technicianQuery);
      const technician = await this.technicianModel.getById(filter);
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
      const technicianQuery : TechnicianQuery = {id_user: id};
      const filter = TechnicianQueryBuilder(technicianQuery);
      const technician = await this.technicianModel.getById(filter);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      const updatedTechnician = await this.technicianModel.update(filter, technicianData);
      res.status(200).json(updatedTechnician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technicianQuery : TechnicianQuery = {id_user: id};
      const filter = TechnicianQueryBuilder(technicianQuery);
      const technician = await this.technicianModel.getById(filter);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      await this.technicianModel.delete(filter);
      res.status(200).json({ message: 'Technician deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
