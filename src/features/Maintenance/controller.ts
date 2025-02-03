import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { Request, Response } from 'express';
import {
  MaintenanceQuery,
  maintenanceSchema,
  mapToEquipmentMaintenanceHistoryTypeTable
} from './utils';
import { NewMaintenance, Maintenance } from './schema';
import { ErrorMessage, validate, validatePagination, validateUpdate } from '../../utils';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { TechnicianQuery } from '../Technician/utils';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { EquipmentQuery } from '../Equipment/utils';
import { pickPlugin, ReportData } from '../../core/utils';

/**
 * Controller responsible for managing maintenance-related operations.
 */
export class MaintenanceController {
  maintenanceModel: IMaintenanceModel;
  technicianModel: ITechnicianModel;
  equipmentModel: IEquipmentModel;

  /**
   * Constructs a new `MaintenanceController`.
   *
   * @param maintenanceModel - The model used to interact with the maintenance data.
   * @param technicianModel
   */
  constructor(
    maintenanceModel: IMaintenanceModel,
    technicianModel: ITechnicianModel,
    equipmentModel: IEquipmentModel
  ) {
    this.maintenanceModel = maintenanceModel;
    this.technicianModel = technicianModel;
    this.equipmentModel = equipmentModel;
  }

  /**
   * Creates a new maintenance record.
   *
   * Validates the request body against the `maintenanceSchema` and creates a new maintenance record
   * if the validation is successful. Responds with the created maintenance record or an error message.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, maintenanceSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const technicianQuery: TechnicianQuery = { id_user: result.data.id_technician };

      const technicianFound = await this.technicianModel.getById(technicianQuery);
      if (!technicianFound) {
        res.status(404).json({ message: 'Technician not found' });
        return;
      }

      const equipmentQuery: EquipmentQuery = { id: result.data.id_equipment };
      const equipmentFound = await this.equipmentModel.getById(equipmentQuery);
      if (!equipmentFound) {
        res.status(404).json({ message: 'Equipment not found' });
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

  /**
   * Retrieves all maintenance records.
   *
   * Retrieves all maintenance records based on the provided query parameters.
   * Responds with the list of maintenance records or an error message.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: MaintenanceQuery = query;
      const pagination = validatePagination(page, size);
      const allMaintenances = await this.maintenanceModel.getAll(filter, pagination);
      res.status(200).json(allMaintenances);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a maintenance record by ID.
   *
   * Retrieves a maintenance record based on the technician ID, equipment ID, and date provided in the request parameters.
   * Responds with the maintenance record or an error message if not found.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_equipment, date } = req.params;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician,
        id_equipment,
        date
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

  /**
   * Updates a maintenance record by ID.
   *
   * Validates the request body against the `maintenanceSchema` and updates the maintenance record
   * if the validation is successful. Responds with the updated maintenance record or an error message.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_equipment, date } = req.params;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician,
        id_equipment,
        date
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

  /**
   * Deletes a maintenance record by ID.
   *
   * Deletes a maintenance record based on the technician ID, equipment ID, and date provided in the request parameters.
   * Responds with a success message or an error message if not found.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { id_technician, id_equipment, date } = req.params;

      const maintenanceQuery: MaintenanceQuery = {
        id_technician,
        id_equipment,
        date
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

  /**
   * Asynchronously generates a maintenance history report for equipment based on the provided filters and format, and sends the report as a downloadable file.
   *
   * @param {Request} req - The HTTP request object, including query parameters for pagination, format, and filters.
   * @param {Response} res - The HTTP response object used to send the generated report or error messages.
   * @throws {Error} If an error occurs during report generation or fetching data, a 500 status with an error message is returned.
   *
   * Query Parameters:
   * - `page` (optional): Page number for paginated results.
   * - `size` (optional): Number of items per page for pagination.
   * - `format` (optional): Format of the report, defaults to 'pdf'.
   * - Additional filters for querying maintenance data can be passed as query parameters.
   *
   * Response:
   * - Returns a downloadable report file in the specified format with a `200` status code if successful.
   * - Returns a `400` status with an error message if the format is not supported.
   * - Returns a `500` status with an error message if an unknown error occurs.
   */
  generateEquipmentHistory = async (req: Request, res: Response) => {
    try {
      const { page, size, format = 'pdf', ...query } = req.query;
      const filter: MaintenanceQuery = query;
      const pagination = validatePagination(page, size);
      const allMaintenances = await this.maintenanceModel.getAll(filter, pagination);

      const equipmentName =
        allMaintenances.items.length > 0 ? allMaintenances.items[0].equipment.name : '';

      const reportData: ReportData = {
        reportName: `Maintenance History: ${equipmentName}`,
        headers: ['Technician', 'Type', 'Date'],
        data: allMaintenances.items.map((maintenance) =>
          mapToEquipmentMaintenanceHistoryTypeTable(maintenance)
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
