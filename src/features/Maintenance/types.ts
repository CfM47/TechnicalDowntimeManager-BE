import { EquipmentInfo } from '../Equipment/types';
import { TechnicianInfo } from '../Technician/types';
import { maintenance } from './schema';
import { equipment } from '../Equipment/schema';
import { user } from '../User/schema';

export interface MaintenanceType {
  technician: TechnicianInfo;
  equipment: EquipmentInfo;
  date: string;
  type: string;
  cost: number;
}

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
