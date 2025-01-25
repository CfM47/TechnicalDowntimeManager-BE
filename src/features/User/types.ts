import { DepartmentType } from '../Department/types';
import { user } from './schema';
import { department } from '../Department/schema';

export interface UserType {
  id: string;
  name: string;
  department: DepartmentType;
  role: string;
}

export const userSelection = {
  id: user.id,
  name: user.name,
  department: {
    id: department.id,
    name: department.name
  },
  role: user.role
};

export const userInfoSelection = {
  id: user.id,
  name: user.name
};

export type UserInfo = Pick<UserType, 'id' | 'name'>;
