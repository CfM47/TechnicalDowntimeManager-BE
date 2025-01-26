import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { Request, Response } from 'express';
import { MaintenanceQuery, maintenanceSchema } from './utils';
import { NewMaintenance, Maintenance } from './schema';
import { ErrorMessage, validate, validateUpdate } from '../../utils';

/**
 * Controller for handling CRUD operations on the `Maintenance` resource.
 *
 * This controller provides methods to create, retrieve, update, and delete maintenance records.
 * Each method interacts with the `IMaintenanceModel` to perform the necessary database operations.
 */
export class MaintenanceController {
  maintenanceModel: IMaintenanceModel;

  /**
   * Constructs a new `MaintenanceController`.
   *
   * @param maintenanceModel - The model used to interact with the maintenance data.
   */
  constructor(maintenanceModel: IMaintenanceModel) {
    this.maintenanceModel = maintenanceModel;
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
      const filter: MaintenanceQuery = req.query;
      const allMaintenances = await this.maintenanceModel.getAll(filter);
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
}
