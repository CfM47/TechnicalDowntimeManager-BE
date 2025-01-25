import { UserType } from '../User/types';
import { technician } from './schema';
import { user } from '../User/schema';
import { department } from '../Department/schema';

export interface TechnicianType extends UserType {
  exp_years: number;
  specialty: string;
}

export const technicianSelection = {
  id: user.id,
  name: user.name,
  department: {
    id: department.id,
    name: department.name
  },
  role: user.role,
  exp_years: technician.exp_years,
  specialty: technician.specialty
};

export type TechnicianInfo = Pick<TechnicianType, 'id' | 'name'>;
