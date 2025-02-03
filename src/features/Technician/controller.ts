import { Request, Response } from 'express';
import {
  mapToInterventionTypeTable,
  mapToPerformanceTypeTable,
  TechnicianQuery,
  technicianSchema
} from './utils';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';
import { NewTechnician, Technician } from './schema';
import { IUserModel } from '../../Interfaces/IUserModel';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { UserQuery } from '../User/utils';
import { pickPlugin, ReportData } from '../../core/utils';
import { TechnicianInterventionType, TechnicianPerformanceType } from './types';

/**
 * Controller for managing technicians.
 *
 * This controller provides the following functionalities:
 * - Creating a new technician
 * - Retrieving all technicians
 * - Retrieving a technician by ID
 * - Updating a technician by ID
 * - Deleting a technician by ID
 */
export class TechnicianController {
  userModel: IUserModel;
  technicianModel: ITechnicianModel;

  /**
   * Constructs a new TechnicianController.
   *
   * @param userModel - The user model interface.
   * @param technicianModel - The technician model interface.
   */
  constructor(userModel: IUserModel, technicianModel: ITechnicianModel) {
    this.userModel = userModel;
    this.technicianModel = technicianModel;
  }

  /**
   * Creates a new technician.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, technicianSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const userQuery: UserQuery = { id: result.data.id_user };

      const userFound = await this.userModel.getById(userQuery);
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

  /**
   * Retrieves all technicians.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: TechnicianQuery = query;
      const pagination = validatePagination(page, size);
      const allTechnicians = await this.technicianModel.getAll(filter, pagination);
      res.status(200).json(allTechnicians);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a technician by ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technicianQuery: TechnicianQuery = { id_user: id };

      const technician = await this.technicianModel.getById(technicianQuery);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      res.status(200).json(technician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates a technician by ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, technicianSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const technicianData: Partial<Technician> = { ...result.data };
      // Check if technician exists before update
      const technicianQuery: TechnicianQuery = { id_user: id };
      const technician = await this.technicianModel.getById(technicianQuery);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      const updatedTechnician = await this.technicianModel.update(technicianQuery, technicianData);
      res.status(200).json(updatedTechnician);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves technician performance data.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  getInterventionData = async (req: Request, res: Response) => {
    try {
      const technicianId = req.params.id;
      const { page, size } = req.query;
      const pagination = validatePagination(page, size);
      const Data = await this.technicianModel.getInterventionData(technicianId, pagination);
      if (!Data) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      res.status(200).json(Data);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes a technician by ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const technicianQuery: TechnicianQuery = { id_user: id };
      const technician = await this.technicianModel.getById(technicianQuery);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }
      await this.technicianModel.delete(technicianQuery);
      res.status(200).json({ message: 'Technician deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves the performance data of all technicians.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  getTechniciansPerformance = async (req: Request, res: Response) => {
    try {
      const { page, size } = req.query;
      const pagination = validatePagination(page, size);
      const result = await this.technicianModel.getTechniciansPerformance(pagination);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  generateTechniciansPerformance = async (req: Request, res: Response) => {
    try {
      const { page, size, format = 'pdf' } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const result = await this.technicianModel.getTechniciansPerformance(pagination);

      const reportData: ReportData = {
        reportName: 'Technicians Performance Report',
        headers: ['Name', 'Score_Avg', 'Total_Rates', 'Total_Maintenances'],
        data: result.items.map((technician: TechnicianPerformanceType) =>
          mapToPerformanceTypeTable(technician)
        )
      };

      const plugin = await pickPlugin(format as string);

      if (!plugin) {
        res.status(400).json({ message: 'Format not supported' });
        return;
      }

      const buffer = await plugin.generate(reportData);

      res
        .status(200)
        .setHeader('Content-Type', `application/${format}`)
        .setHeader('Content-Disposition', `attachment; filename="report.${format}"`)
        .send(buffer);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  generateTechniciansIntervention = async (req: Request, res: Response) => {
    try {
      const technicianId = req.params.id;
      const { page, size, format = 'pdf' } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const result = await this.technicianModel.getInterventionData(technicianId, pagination);

      const reportData: ReportData = {
        reportName: `Technicians Intervention Report`,
        headers: ['Date', 'Type', 'Additional_Info'],
        data: result.items.map((intervention: TechnicianInterventionType) =>
          mapToInterventionTypeTable(intervention)
        )
      };

      const plugin = await pickPlugin(format as string);

      if (!plugin) {
        res.status(400).json({ message: 'Format not supported' });
        return;
      }

      const buffer = await plugin.generate(reportData);

      res
        .status(200)
        .setHeader('Content-Type', `application/${format}`)
        .setHeader('Content-Disposition', `attachment; filename="report.${format}"`)
        .send(buffer);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
