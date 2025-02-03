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
 * TechnicianController manages HTTP requests related to technicians,
 * including creation, retrieval, update, deletion, and generation of reports.
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

  /**
   * Asynchronously generates and returns a technicians performance report in the specified format.
   *
   * @param {Request} req - The HTTP request object containing query parameters.
   * @param {Response} res - The HTTP response object used to send the generated report or error messages.
   *
   * @throws {Error} Throws an error if any issue occurs during the report generation process.
   *
   * Query Parameters:
   *   - `page` (optional): The page number for pagination.
   *   - `size` (optional): The size of items per page for pagination.
   *   - `format` (optional, default is 'pdf'): The file format in which the report should be generated (e.g., pdf, csv).
   *
   * Response:
   *   - On success: Returns the performance report as a downloadable file in the specified format with status code 200.
   *   - On failure:
   *       - Returns a 400 status code if the specified format is not supported.
   *       - Returns a 500 status code in case of other errors.
   */
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

  /**
   * Generates an intervention report for a specific technician based on the provided parameters.
   *
   * This asynchronous function retrieves the intervention data for a technician, formats it into
   * a report, and sends the generated report file as a response in the requested format (e.g., PDF).
   * The function also supports pagination for retrieving a subset of intervention records.
   *
   * @param {Request} req - The request object containing parameters such as technician ID, pagination details (page, size), and report format.
   * @param {Response} res - The response object used to send the generated report or error messages back to the client.
   *
   * @throws {Error} Will return a 500 status code if an unexpected error occurs during the report generation.
   * @throws {Error} Will return a 400 status code if the requested format is not supported.
   *
   * Parameters:
   * - `req.params.id` (string): The ID of the technician whose intervention data is to be retrieved.
   * - `req.query.page` (number): The page number for paginated results (optional).
   * - `req.query.size` (number): The number of results per page for paginated results (optional).
   * - `req.query.format` (string): The desired format of the report file (e.g., 'pdf'). Defaults to 'pdf' if not provided.
   *
   * Behavior:
   * - Validates the pagination parameters.
   * - Fetches intervention data from the database for the specified technician ID and pagination settings.
   * - Transforms the intervention data into a format suitable for report generation.
   * - Selects the appropriate plugin to generate the report file based on the requested format.
   * - Sends the generated report file as an attachment in the HTTP response with appropriate headers.
   *
   * Response:
   * - HTTP 200: If the report generation is successful, the response will include the generated report file.
   * - HTTP 400: If the requested format is not supported.
   * - HTTP 500: If an internal error occurs during the process.
   */
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
