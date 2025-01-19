import { DepartmentType } from '../Department/types';
import { RoleType } from '../Role/types';
import { user } from './schema';
import { department } from '../Department/schema';
import { role } from '../Role/schema';

export interface UserType {
  id: string;
  name: string;
  department: DepartmentType;
  role: RoleType;
}

export const userSelection = {
  id: user.id,
  name: user.name,
  department: {
    id: department.id,
    name: department.name
  },
  role: {
    id: role.id,
    name: role.name
  }
};

export const userInfoSelection = {
  id: user.id,
  name: user.name
};

export type UserInfo = Pick<UserType, 'id' | 'name'>;
