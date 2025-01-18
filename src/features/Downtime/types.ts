import { Department } from '../Department/types';
import { EquipmentInfo } from '../Equipment/types';
import { UserInfo } from '../User/types';

export interface Downtime {
  sender: UserInfo;
  receiver: UserInfo;
  equipment: EquipmentInfo;
  date: string;
  dep_receiver: Department;
  status: string;
  cause: string;
}
