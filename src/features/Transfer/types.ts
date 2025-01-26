import { DepartmentType } from '../Department/types';
import { EquipmentInfo, equipmentInfoSelection } from '../Equipment/types';
import { UserInfo } from '../User/types';
import { transfer } from './schema';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { department } from '../Department/schema';

/**
 * Represents a transfer with detailed information.
 *
 * @property sender - Information about the sender.
 * @property receiver - Information about the receiver.
 * @property equipment - Information about the equipment being transferred.
 * @property date - The date of the transfer.
 * @property origin_dep - Information about the origin department.
 * @property receiver_dep - Information about the receiver department.
 * @property status - The status of the transfer.
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
