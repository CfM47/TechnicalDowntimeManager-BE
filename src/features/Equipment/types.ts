import { DepartmentType } from '../Department/types';
import { equipment } from './schema';
import { department } from '../Department/schema';
import { count } from 'drizzle-orm';

/**
 * Interface representing the equipment type.
 */
export interface EquipmentType {
  id: string;
  name: string;
  type: string;
  status: string;
  department: DepartmentType;
  acquisition_date: string;
}

export interface EquipmentWithMaintenances extends EquipmentType {
  totalMaintenances: number;
}

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

export const equipmentsWithMaintenancesSelection = {
  ...equipmentSelection,
  totalMaintenances: count()
};

export const EquipmentOrderBy = {
  name: equipment.name,
  date: equipment.acquisition_date
};

/**
 * Selection object for retrieving full equipment details.
 */

/**
 * Selection object for retrieving basic equipment information.
 */
export const equipmentInfoSelection = {
  id: equipment.id,
  name: equipment.name
};

/**
 * Type representing basic equipment information.
 */
export type EquipmentInfo = Pick<EquipmentType, 'id' | 'name'>;

export interface DefectiveEquipmentTypeTable {
  Name: string;
  Type: string;
  Status: string;
  Department: string;
  Total_Maintenances: number;
}
