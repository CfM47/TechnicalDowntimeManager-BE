import { EquipmentInfo } from '../Equipment/types';
import { TechnicianInfo } from '../Technician/types';
import { maintenance } from './schema';
import { equipment } from '../Equipment/schema';
import { user } from '../User/schema';

/**
 * Interface representing a maintenance record.
 *
 * This interface defines the structure of a maintenance record, including
 * the technician information, equipment information, date of maintenance,
 * type of maintenance, and cost.
 */
export interface MaintenanceType {
  technician: TechnicianInfo;
  equipment: EquipmentInfo;
  date: string;
  type: string;
  cost: number;
}

/**
 * Selection object for maintenance records.
 *
 * This object defines the fields to be selected from the `maintenance` table,
 * including technician ID and name, equipment ID and name, date of maintenance,
 * type of maintenance, and cost.
 */
export const maintenanceSelection = {
  technician: {
    id: maintenance.id_technician,
    name: user.name
  },
  equipment: {
    id: maintenance.id_equipment,
    name: equipment.name
  },
  date: maintenance.date,
  type: maintenance.type,
  cost: maintenance.cost
};

export interface EquipmentMaintenanceHistoryTypeTable {
  Technician: string;
  Type: string;
  Date: string;
}
