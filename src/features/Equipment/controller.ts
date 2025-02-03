import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { Request, Response } from 'express';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';
import { EquipmentQuery, equipmentSchema, mapToDefectiveEquipmentTypeTable } from './utils';
import { Equipment, NewEquipment } from './schema';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { pickPlugin, ReportData } from '../../core/utils';

/**
 * EquipmentController is responsible for handling operations related to managing
 * equipment records, such as creating, retrieving, updating, and deleting equipment,
 * as well as generating reports for equipment with frequent maintenances.
 */
export class EquipmentController {
  equipmentModel: IEquipmentModel;
  departmentModel: IDepartmentModel;

  /**
   * Constructs an EquipmentController.
   *
   * @param equipmentModel - The model used to interact with the equipment database.
   * @param departmentModel
   */
  constructor(equipmentModel: IEquipmentModel, departmentModel: IDepartmentModel) {
    this.equipmentModel = equipmentModel;
    this.departmentModel = departmentModel;
  }

  /**
   * Creates a new equipment record.
   *
   * Validates the request body against the equipment schema and inserts the
   * new equipment record into the database.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, equipmentSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const department = await this.departmentModel.getById({ id: result.data.id_department });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }

      const equipmentData: NewEquipment = {
        ...result.data
      };
      const newEquipment = await this.equipmentModel.create(equipmentData);
      res.status(201).json(newEquipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all equipment records.
   *
   * Fetches all equipment records from the database based on the provided
   * query parameters.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, orderBy, ...query } = req.query;
      const filter: EquipmentQuery = query;
      const pagination: Pagination = validatePagination(page, size);
      const allEquipments = await this.equipmentModel.getAll(filter, pagination, orderBy as string);
      res.status(200).json(allEquipments);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves an equipment record by ID.
   *
   * Fetches a single equipment record from the database based on the provided
   * equipment ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const equipmentQuery = { id: id };
      const equipment = await this.equipmentModel.getById(equipmentQuery);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      res.status(200).json(equipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates an equipment record by ID.
   *
   * Validates the request body against the equipment schema and updates the
   * specified equipment record in the database.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, equipmentSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const equipmentData: Partial<Equipment> = { ...result.data };
      const equipmentQuery: EquipmentQuery = { id: id };
      const equipment = await this.equipmentModel.getById(equipmentQuery);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      const updatedEquipment = await this.equipmentModel.update(equipmentQuery, equipmentData);
      res.status(200).json(updatedEquipment);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes an equipment record by ID.
   *
   * Removes the specified equipment record from the database.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const equipmentQuery: EquipmentQuery = { id: id };
      const equipment = await this.equipmentModel.getById(equipmentQuery);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      await this.equipmentModel.delete(equipmentQuery);
      res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getEquipmentsWithFrequentMaintenances = async (req: Request, res: Response) => {
    try {
      const { page, size } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const equipments =
        await this.equipmentModel.getEquipmentsWithFrequentMaintenances(pagination);
      res.status(200).json(equipments);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  generateReportEquipmentWithFrequentMaintenances = async (req: Request, res: Response) => {
    try {
      const { page, size, format = 'pdf' } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const equipments =
        await this.equipmentModel.getEquipmentsWithFrequentMaintenances(pagination);

      const reportData: ReportData = {
        reportName: 'Defective Equipments Report',
        headers: ['Name', 'Type', 'Status', 'Department', 'Total_Maintenances'],
        data: equipments.items.map((equipment) => mapToDefectiveEquipmentTypeTable(equipment))
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
