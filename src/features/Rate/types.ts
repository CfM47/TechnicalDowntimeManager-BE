import { UserInfo } from '../User/types';
import { TechnicianInfo } from '../Technician/types';

export interface Rate {
  technician: TechnicianInfo;
  user: UserInfo;
  date: string;
  comment: string;
  score: number;
}
