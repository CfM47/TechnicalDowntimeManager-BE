import { DepartmentType } from '../Department/types';
import { EquipmentInfo, equipmentInfoSelection } from '../Equipment/types';
import { UserInfo } from '../User/types';
import { transfer } from './schema';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { department } from '../Department/schema';

/**
 * Represents a transfer operation within a system, including details about the sender, receiver, equipment, and status.
 *
 * @interface TransferType
 * @property {UserInfo} sender - Information about the user initiating the transfer.
 * @property {UserInfo} receiver - Information about the user receiving the transfer.
 * @property {EquipmentInfo} equipment - Details about the equipment being transferred.
 * @property {string} date - The date when the transfer is scheduled or took place, in ISO 8601 format.
 * @property {DepartmentType} origin_dep - Details about the department initiating the transfer.
 * @property {DepartmentType} receiver_dep - Details about the receiving department.
 * @property {string} status - The current status of the transfer (e.g., pending, completed, canceled).
 */
export interface TransferType {
  sender: UserInfo;
  receiver: UserInfo;
  equipment: EquipmentInfo;
  date: string;
  origin_dep: DepartmentType;
  receiver_dep: DepartmentType;
  status: string;
}

/**
 * Represents the selection object for transferring resources or equipment between entities.
 *
 * @property {Object} sender - Details of the user initiating the transfer.
 * @property {string} sender.id - Unique identifier of the sender.
 * @property {string} sender.name - Name of the sender.
 *
 * @property {Object} receiver - Details of the user receiving the transfer.
 * @property {string} receiver.id - Unique identifier of the receiver.
 * @property {string} receiver.name - Name of the receiver.
 *
 * @property {Object} equipment - Information about the equipment being transferred.
 *
 * @property {string} date - The date of the transfer.
 *
 * @property {Object} origin_dep - Details of the originating department.
 * @property {string} origin_dep.id - Unique identifier of the originating department.
 * @property {string} origin_dep.name - Name of the originating department.
 *
 * @property {Object} receiver_dep - Details of the receiving department.
 * @property {string} receiver_dep.id - Unique identifier of the receiving department.
 * @property {string} receiver_dep.name - Name of the receiving department.
 *
 * @property {string} status - The current status of the transfer.
 */
export const transferSelection = {
  sender: {
    id: alias(user, 'sender').id,
    name: alias(user, 'sender').name
  },
  receiver: {
    id: alias(user, 'receiver').id,
    name: alias(user, 'receiver').name
  },
  equipment: equipmentInfoSelection,
  date: transfer.date,
  origin_dep: {
    id: alias(department, 'origin_dep').id,
    name: alias(department, 'origin_dep').name
  },
  receiver_dep: {
    id: alias(department, 'receiver_dep').id,
    name: alias(department, 'receiver_dep').name
  },
  status: transfer.status
};

/**
 * Represents a record of equipment transfer details in a tabular format.
 *
 * The `EquipmentTransferRecordTypeTable` interface is used to define the structure of data
 * related to the transfer of equipment between departments. Each property captures specific
 * details about the transfer process.
 *
 * Properties:
 * - `Sender`: The name or identifier of the person or entity sending the equipment.
 * - `Origin_Department`: The department from which the equipment is being sent.
 * - `Destiny_Department`: The department to which the equipment is being delivered.
 * - `Receiver`: The name or identifier of the person or entity receiving the equipment.
 * - `Date`: The date on which the transfer occurred. It is represented as a string.
 */
export interface EquipmentTransferRecordTypeTable {
  Sender: string;
  Origin_Department: string;
  Destiny_Department: string;
  Receiver: string;
  Date: string;
}

/**
 * Represents a table structure for department transfer record details.
 *
 * This interface outlines the data associated with a department's
 * equipment transfer record, including sender and receiver details,
 * the originating department, and the equipment involved in the transfer.
 *
 * Properties:
 * - `Sender`: A string representing the entity or person sending the equipment.
 * - `Receiver`: A string representing the entity or person receiving the equipment.
 * - `Origin_Department`: A string representing the department from which the equipment originated.
 * - `Equipment`: A string representing the equipment being transferred.
 */
export interface DepartmentTransferRecordTypeTable {
  Sender: string;
  Receiver: string;
  Origin_Department: string;
  Equipment: string;
}
