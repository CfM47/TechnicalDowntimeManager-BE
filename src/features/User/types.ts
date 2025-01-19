import { Department } from '../Department/types';
import { Role } from '../Role/types';

export interface User {
  id: string;
  name: string;
  department: Department;
  role: Role;
}

export type UserInfo = Pick<User, 'id' | 'name'>;
