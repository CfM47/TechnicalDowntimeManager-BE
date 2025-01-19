import { User } from '../User/types';

export interface Technician extends User {
  exp_years: number;
  specialty: string;
}

export type TechnicianInfo = Pick<Technician, 'id' | 'name'>;
