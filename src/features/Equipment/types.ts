import { DepartmentType } from '../Department/types';
import { equipment } from './schema';
import { department } from '../Department/schema';
import { count } from 'drizzle-orm';

/**
 * Represents the structure and details of an equipment item.
 *
 * This interface is used to store and manage key information about equipment,
 * including its identification, name, type, status, associated department,
 * and acquisition date.
 *
 * Properties:
 * - `id`: A unique identifier for the equipment.
 * - `name`: The name or label of the equipment.
 * - `type`: The category or classification of the equipment.
 * - `status`: The current operational state or condition of the equipment.
 * - `department`: The department or team to which the equipment is assigned.
 * - `acquisition_date`: The date the equipment was acquired.
 */
export interface EquipmentType {
  id: string;
  name: string;
  type: string;
  status: string;
  department: DepartmentType;
  acquisition_date: string;
}

/**
 * Represents equipment details along with its maintenance information.
 * Extends the `EquipmentType` interface to include additional data specific to maintenance tracking.
 *
 * This interface is used to combine the general characteristics of the equipment with the
 * total number of maintenance events associated with it.
 */
export interface EquipmentWithMaintenances extends EquipmentType {
  totalMaintenances: number;
}

/**
 * Represents the selection of equipment with its associated details.
 *
 * @typedef {Object} equipmentSelection
 * @property {number} id - The unique identifier of the equipment.
 * @property {string} name - The name of the equipment.
 * @property {string} type - The type/category of the equipment.
 * @property {string} status - The current status of the equipment (e.g., active, inactive).
 * @property {Object} department - The department associated with the equipment.
 * @property {number} department.id - The unique identifier of the department associated with the equipment.
 * @property {string} department.name - The name of the department associated with the equipment.
 * @property {string} acquisition_date - The date the equipment was acquired.
 */
export const equipmentSelection = {
  id: equipment.id,
  name: equipment.name,
  type: equipment.type,
  status: equipment.status,
  department: {
    id: equipment.id_department,
    name: department.name
  },
  acquisition_date: equipment.acquisition_date
};

/**
 * Represents the selection of equipments along with their maintenance count.
 *
 * Combines the equipment selection object with an additional property `totalMaintenances`,
 * which indicates the total number of maintenance activities associated with the equipment.
 *
 * This object is used to provide a detailed view of equipment data, integrating maintenance statistics.
 *
 * @type {Object}
 * @property {Object} equipmentSelection - The base selection object containing equipment details.
 * @property {number} totalMaintenances - The total number of maintenance records for the equipment.
 */
export const equipmentsWithMaintenancesSelection = {
  ...equipmentSelection,
  totalMaintenances: count()
};

/**
 * Represents an object that specifies ordering for equipment-related operations.
 * Contains properties used to define sorting criteria.
 *
 * @property {string} name - The property indicating the name of the equipment.
 * @property {string} date - The property indicating the equipment acquisition date.
 */
export const EquipmentOrderBy = {
  name: equipment.name,
  date: equipment.acquisition_date
};

/**
 * Selection object for retrieving full equipment details.
 */

/**
 * Represents a selection of equipment information with specific details.
 *
 * @typedef {Object} equipmentInfoSelection
 * @property {number|string} id - The unique identifier of the equipment.
 * @property {string} name - The name of the equipment.
 */
export const equipmentInfoSelection = {
  id: equipment.id,
  name: equipment.name
};

/**
 * Represents essential information about a piece of equipment.
 * The `EquipmentInfo` type is a subset of the `EquipmentType` object, containing only specific properties.
 *
 * This type includes:
 * - `id`: The unique identifier for the equipment.
 * - `name`: The name of the equipment.
 *
 * Useful for scenarios where only the basic identification properties of the equipment are needed.
 */
export type EquipmentInfo = Pick<EquipmentType, 'id' | 'name'>;

/**
 * Represents a table structure to manage information related to defective equipment types.
 *
 * @interface DefectiveEquipmentTypeTable
 * @property {string} Name - The name of the defective equipment type.
 * @property {string} Type - The specific type or category of the equipment.
 * @property {string} Status - The current status of the equipment (e.g., operational, defective, under maintenance).
 * @property {string} Department - The department responsible for or associated with the equipment.
 * @property {number} Total_Maintenances - The total number of maintenances performed on the equipment.
 */
export interface DefectiveEquipmentTypeTable {
  Name: string;
  Type: string;
  Status: string;
  Department: string;
  Total_Maintenances: number;
}
