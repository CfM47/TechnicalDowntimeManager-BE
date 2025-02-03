import { EquipmentInfo } from '../Equipment/types';
import { TechnicianInfo } from '../Technician/types';
import { maintenance } from './schema';
import { equipment } from '../Equipment/schema';
import { user } from '../User/schema';

/**
 * Represents the details of a maintenance activity.
 *
 * @interface MaintenanceType
 *
 * @property {TechnicianInfo} technician - Information about the technician performing the maintenance.
 * @property {EquipmentInfo} equipment - Information about the equipment being maintained.
 * @property {string} date - The date when the maintenance activity occurred or is scheduled.
 * @property {string} type - The type or category of the maintenance being performed.
 * @property {number} cost - The total cost associated with the maintenance activity.
 */
export interface MaintenanceType {
  technician: TechnicianInfo;
  equipment: EquipmentInfo;
  date: string;
  type: string;
  cost: number;
}

/**
 * Represents a maintenance selection object containing details about the technician, equipment,
 * and maintenance specifics such as date, type, and cost.
 *
 * @typedef {Object} maintenanceSelection
 * @property {Object} technician - Information about the technician responsible for the maintenance.
 * @property {number} technician.id - The unique identifier of the technician.
 * @property {string} technician.name - The name of the technician.
 * @property {Object} equipment - Information about the equipment being maintained.
 * @property {number} equipment.id - The unique identifier of the equipment.
 * @property {string} equipment.name - The name of the equipment.
 * @property {string} date - The date of the maintenance operation.
 * @property {string} type - The type of maintenance performed.
 * @property {number} cost - The cost associated with the maintenance.
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

/**
 * Represents the structure for an equipment maintenance history entry.
 *
 * This interface defines the essential details of maintenance history types captured
 * for a piece of equipment, allowing for consistent data structure representation.
 *
 * Properties:
 * - Technician: The name of the technician who performed the maintenance.
 * - Type: The category or specific type of maintenance performed.
 * - Date: The date when the maintenance was conducted, represented as a string.
 */
export interface EquipmentMaintenanceHistoryTypeTable {
  Technician: string;
  Type: string;
  Date: string;
}
