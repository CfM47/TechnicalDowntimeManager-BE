import { DepartmentType } from '../Department/types';
import { equipment } from './schema';
import { department } from '../Department/schema';

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

export const EquipmentOrderBy = {
  name: equipment.name,
  date: equipment.acquisition_date
};

/**
 * Selection object for retrieving full equipment details.
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
