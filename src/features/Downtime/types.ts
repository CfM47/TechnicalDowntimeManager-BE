import { DepartmentType } from '../Department/types';
import { EquipmentInfo } from '../Equipment/types';
import { UserInfo } from '../User/types';
import { downtime } from './schema';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';

/**
 * Interface representing a downtime record.
 */
export interface DowntimeType {
  sender: UserInfo;
  receiver: UserInfo;
  equipment: EquipmentInfo;
  date: string;
  dep_receiver: DepartmentType;
  status: string;
  cause: string;
}

/**
 * Selection object for downtime records.
 *
 * This object defines the fields to be selected from the downtime table,
 * including related user, equipment, and department information.
 */
export const downtimeSelection = {
  sender: {
    id: downtime.id_sender,
    name: alias(user, 'sender').name
  },
  receiver: {
    id: downtime.id_receiver,
    name: alias(user, 'receiver').name
  },
  equipment: {
    id: downtime.id_equipment,
    name: equipment.name
  },
  date: downtime.date,
  dep_receiver: {
    id: downtime.id_dep_receiver,
    name: department.name
  },
  status: downtime.status,
  cause: downtime.cause
};

/**
 * Interface representing a downtime record for the last year.
 */
export interface DowntimeLastYearType {
  equipmentName: string;
  cause: string;
  departmentName: string;
  receiverName: string;
  downtimeDate: string;
}

/**
 * Selection object for downtime records for the last year.
 *
 * This object defines the fields to be selected from the downtime table
 * for records from the last year, including related user, equipment,
 * and department information.
 */
export const downtimeLastYearSelection = {
  equipmentName: equipment.name,
  cause: downtime.cause,
  departmentName: department.name,
  receiverName: user.name,
  downtimeDate: downtime.date
};
