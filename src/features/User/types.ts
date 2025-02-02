import { DepartmentType } from '../Department/types';
import { RoleType } from '../Role/types';
import { user } from './schema';
import { department } from '../Department/schema';
import { role } from '../Role/schema';

/**
 * Interface representing a user.
 */
export interface UserType {
  id: string;
  name: string;
  department: DepartmentType;
  role: RoleType;
}

/**
 * Selection object for user data.
 */
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

/**
 * Selection object for basic user information.
 */
export const userInfoSelection = {
  id: user.id,
  name: user.name
};

/**
 * Type representing basic user information.
 */
export type UserInfo = Pick<UserType, 'id' | 'name'>;
