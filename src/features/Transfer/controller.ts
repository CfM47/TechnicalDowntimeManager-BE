import { ITransferModel } from '../../Interfaces/ITransferModel';
import { Request, Response } from 'express';
import {
  mapToDepartmentTransferRecordTypeTable,
  mapToEquipmentTransferRecordTypeTable,
  TransferQuery,
  transferSchema
} from './utils';
import { NewTransfer, Transfer } from './schema';
import { ErrorMessage, validate, validatePagination, validateUpdate } from '../../utils';
import { IUserModel } from '../../Interfaces/IUserModel';
import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { pickPlugin, ReportData } from '../../core/utils';

/**
 * Controller responsible for handling transfer-related operations such as creation,
 * retrieval, updating, and deletion of transfers.
 */
export class TransferController {
  transferModel: ITransferModel;
  userModel: IUserModel;
  equipmentModel: IEquipmentModel;
  departmentModel: IDepartmentModel;

  constructor(
    transferModel: ITransferModel,
    userModel: IUserModel,
    equipmentModel: IEquipmentModel,
    departmentModel: IDepartmentModel
  ) {
    this.transferModel = transferModel;
    this.userModel = userModel;
    this.equipmentModel = equipmentModel;
    this.departmentModel = departmentModel;
  }
  /**
   * Creates a new transfer.
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, transferSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const data = result.data;

      if (data.id_sender == data.id_receiver) {
        res.status(400).json({ message: 'The sender and receiver cannot be the same' });
        return;
      }

      const sender = await this.userModel.getById({ id: data.id_sender });

      if (!sender) {
        res.status(404).json({ message: 'Sender not found' });
        return;
      }

      const receiver = await this.userModel.getById({ id: data.id_receiver });

      if (!receiver) {
        res.status(404).json({ message: 'Receiver not found' });
        return;
      }

      const equipment = await this.equipmentModel.getById({ id: data.id_equipment });

      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }

      if (equipment.department.id == data.id_receiver_dep) {
        res.status(400).json({
          message: 'The receiver department cannot be the same as the equipment department'
        });
        return;
      }

      const dep_receiver = await this.departmentModel.getById({ id: data.id_receiver_dep });
      if (!dep_receiver) {
        res.status(404).json({ message: 'Receiver department not found' });
        return;
      }

      if (data.status == 'Completado') {
        await this.equipmentModel.update(
          { id: equipment.id },
          { id_department: data.id_receiver_dep }
        );
      }

      const transferData: NewTransfer = {
        id_sender: data.id_sender,
        id_receiver: data.id_receiver,
        id_equipment: data.id_equipment,
        id_origin_dep: equipment.department.id,
        id_receiver_dep: data.id_receiver_dep,
        status: data.status
      };

      const newTransfer = await this.transferModel.create(transferData);
      res.status(201).json(newTransfer);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all transfers.
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: TransferQuery = query;
      const pagination = validatePagination(page, size);
      const allTransfers = await this.transferModel.getAll(filter, pagination);
      res.status(200).json(allTransfers);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a transfer by ID.
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };

      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }
      res.status(200).json(transferFound);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates a transfer by ID.
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };

      const result = validateUpdate(req.body, transferSchema);
      console.log(result);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }

      const data = result.data;

      if (data.id_sender) {
        const sender = await this.userModel.getById({ id: data.id_sender });
        if (!sender) {
          res.status(404).json({ message: 'Sender not found' });
          return;
        }
      }

      if (data.id_receiver) {
        const receiver = await this.userModel.getById({ id: data.id_receiver });
        if (!receiver) {
          res.status(404).json({ message: 'Receiver not found' });
          return;
        }
      }

      if (data.id_equipment) {
        const equipment = await this.equipmentModel.getById({ id: data.id_equipment });
        if (!equipment) {
          res.status(404).json({ message: 'Equipment not found' });
        }
      }

      if (data.id_receiver_dep) {
        const department = await this.departmentModel.getById({ id: data.id_receiver_dep });
        if (!department) {
          res.status(404).json({ message: 'Receiver department not found' });
        }
      }

      if (data.status && data.status == 'Completado') {
        await this.equipmentModel.update({ id: id_equipment }, { id_department: id_receiver_dep });
      }

      const transferData: Partial<Transfer> = { ...data };

      const updatedTransfer = await this.transferModel.update(transferQuery, transferData);

      res.status(200).json(updatedTransfer);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes a transfer by ID.
   * @param req - The request object.
   * @param res - The response object.
   */

  delete = async (req: Request, res: Response) => {
    try {
      const id_sender = req.params.id_sender;
      const id_receiver = req.params.id_receiver;
      const id_equipment = req.params.id_equipment;
      const date = req.params.date;
      const id_origin_dep = req.params.id_origin_dep;
      const id_receiver_dep = req.params.id_receiver_dep;

      const transferQuery: TransferQuery = {
        id_sender: id_sender,
        id_receiver: id_receiver,
        id_equipment: id_equipment,
        date: date,
        id_origin_dep: id_origin_dep,
        id_receiver_dep: id_receiver_dep
      };
      const transferFound = await this.transferModel.getById(transferQuery);
      if (!transferFound) {
        res.status(404).json({ message: 'Transfer not found' });
        return;
      }
      await this.transferModel.delete(transferQuery);
      res.status(200).json({ message: 'Transfer deleted' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  generateEquipmentTransferRecord = async (req: Request, res: Response) => {
    try {
      const { page, size, format = 'pdf', ...query } = req.query;
      const filter: TransferQuery = query;
      const pagination = validatePagination(page, size);
      const allTransfers = await this.transferModel.getAll(filter, pagination);

      const equipmentName =
        allTransfers.items.length > 0 ? allTransfers.items[0].equipment.name : '';

      const reportData: ReportData = {
        reportName: `Maintenance History: ${equipmentName}`,
        headers: ['Sender', 'Origin_Department', 'Destiny_Department', 'Receiver', 'Date'],
        data: allTransfers.items.map((transfers) =>
          mapToEquipmentTransferRecordTypeTable(transfers)
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

  generateDepartmentTransferRecord = async (req: Request, res: Response) => {
    try {
      const { page, size, format = 'pdf', ...query } = req.query;
      const filter: TransferQuery = query;
      const pagination = validatePagination(page, size);
      const allTransfers = await this.transferModel.getAll(filter, pagination);

      const departmentName =
        allTransfers.items.length > 0 ? allTransfers.items[0].receiver_dep.name : '';

      const reportData: ReportData = {
        reportName: `Maintenance History: ${departmentName}`,
        headers: ['Sender', 'Receiver', 'Origin_Department', 'Equipment'],
        data: allTransfers.items.map((transfers) =>
          mapToDepartmentTransferRecordTypeTable(transfers)
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
