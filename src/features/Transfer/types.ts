import { Department } from '../Department/types';
import { EquipmentInfo } from '../Equipment/types';
import { UserInfo } from '../User/types';

export interface Transfer {
  sender: UserInfo;
  receiver: UserInfo;
  equipment: EquipmentInfo;
  date: string;
  origin_dep: Department;
  receiver_dep: Department;
  status: string;
}
