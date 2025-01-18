import { EquipmentInfo } from '../Equipment/types';
import { TechnicianInfo } from '../Technician/types';

export interface Maintenance {
  technician: TechnicianInfo;
  equipment: EquipmentInfo;
  date: string;
  type: string;
  cost: number;
}
