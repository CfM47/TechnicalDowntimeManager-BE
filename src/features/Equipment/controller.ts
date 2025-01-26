import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { Request, Response } from 'express';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';
import { EquipmentQuery, equipmentSchema } from './utils';
import { Equipment, NewEquipment } from './schema';

/**
 * Controller for handling CRUD operations on equipment.
 *
 * This controller provides methods to create, retrieve, update, and delete
 * equipment records. It uses an equipment model to interact with the database
 * and performs validation on incoming requests.
 */
export class EquipmentController {
  equipmentModel: IEquipmentModel;

  /**
   * Constructs an EquipmentController.
   *
   * @param equipmentModel - The model used to interact with the equipment database.
   */
  constructor(equipmentModel: IEquipmentModel) {
    this.equipmentModel = equipmentModel;
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
      const { page, size, ...query } = req.query;
      const filter: EquipmentQuery = query;
      const pagination: Pagination = validatePagination(page, size);
      const allEquipments = await this.equipmentModel.getAll(filter, pagination);
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
}
