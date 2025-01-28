import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { Request, Response } from 'express';
import { DowntimeQuery, downtimeSchema } from './utils';
import { NewDowntime, Downtime } from './schema';
import {
  ErrorMessage,
  Pagination,
  validate,
  validatePagination,
  validateUpdate
} from '../../utils';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { EquipmentQuery } from '../Equipment/utils';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { IUserModel } from '../../Interfaces/IUserModel';

/**
 * Controller class for handling downtime-related operations.
 *
 * This class provides methods for creating, retrieving, updating, and deleting
 * downtime records. It interacts with the downtime model to perform these operations
 * and sends appropriate HTTP responses based on the outcome.
 */
export class DowntimeController {
  downtimeModel: IDowntimeModel;
  equipmentModel: IEquipmentModel;
  departmentModel: IDepartmentModel;
  userModel: IUserModel;

  constructor(
    downtimeModel: IDowntimeModel,
    equipmentModel: IEquipmentModel,
    departmentModel: IDepartmentModel,
    userModel: IUserModel
  ) {
    this.downtimeModel = downtimeModel;
    this.equipmentModel = equipmentModel;
    this.departmentModel = departmentModel;
    this.userModel = userModel;
  }

  /**
   * Creates a new downtime record.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, downtimeSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const downtimeData: NewDowntime = {
        ...result.data
      };

      const firstUserQuery = { id: downtimeData.id_sender };
      const secondUserQuery = { id: downtimeData.id_receiver };

      const firstUser = await this.userModel.getById(firstUserQuery);
      const secondUser = await this.userModel.getById(secondUserQuery);

      if (!firstUser || !secondUser) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      if (downtimeData.id_receiver === downtimeData.id_sender) {
        res.status(400).json({ message: 'Sender and receiver cannot be the same user' });
        return;
      }

      const departmentQuery = { id: downtimeData.id_dep_receiver };
      const department = await this.departmentModel.getById(departmentQuery);

      if (!department) {
        res.status(400).json({ message: 'Department not found' });
        return;
      }

      const equipmentQuery: EquipmentQuery = { id: downtimeData.id_equipment };
      const equipment = await this.equipmentModel.getById(equipmentQuery);

      if (!equipment) {
        res.status(400).json({ message: 'Equipment not found' });
        return;
      }

      const newDowntime = await this.downtimeModel.create(downtimeData);
      await this.equipmentModel.update(equipmentQuery, {
        status: 'Baja',
        id_department: downtimeData.id_dep_receiver
      });
      // cb911356-501b-4a78-bbce-7fee12326946 id de computadora desaparecida
      res.status(201).json(newDowntime);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all downtime records based on the provided filter.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: DowntimeQuery = query;
      const pagination: Pagination = validatePagination(page, size);
      const allDowntimes = await this.downtimeModel.getAll(filter, pagination);
      res.status(200).json(allDowntimes);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a downtime record by its composite key.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };

      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      res.status(200).json(downtimeFound);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates a downtime record by its composite key.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };
      const result = validateUpdate(req.body, downtimeSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const downtimeData: Partial<Downtime> = { ...result.data };
      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      const updatedDowntime = await this.downtimeModel.update(downtimeQuery, downtimeData);
      res.status(200).json(updatedDowntime);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes a downtime record by its composite key.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_dep_receiver = req.params.id_dep_receiver;

      const downtimeQuery: DowntimeQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_dep_receiver: id_dep_receiver
      };
      const downtimeFound = await this.downtimeModel.getById(downtimeQuery);
      if (!downtimeFound) {
        res.status(404).json({ message: 'Downtime not found' });
        return;
      }
      await this.downtimeModel.delete(downtimeQuery);
      res.status(200).json({ message: 'Downtime deleted' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all downtime records from the last year.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  getDowntimeLastYear = async (req: Request, res: Response) => {
    try {
      const { page, size } = req.query;
      const pagination: Pagination = validatePagination(page, size);
      const allDowntimesLastYear = await this.downtimeModel.getLastYearDowntime(pagination);
      res.json(allDowntimesLastYear);
    } catch (error) {
      console.error('Report error:', error);
      res.status(500).json({ message: 'Failed to generate report' });
    }
  };
}
