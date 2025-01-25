import { DepartmentType } from '../Department/types';
import { equipment } from './schema';
import { department } from '../Department/schema';

export interface EquipmentType {
  id: string;
  name: string;
  type: string;
  status: string;
  department: DepartmentType;
  acquisition_date: string;
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

export const equipmentInfoSelection = {
  id: equipment.id,
  name: equipment.name
};

export type EquipmentInfo = Pick<EquipmentType, 'id' | 'name'>;
