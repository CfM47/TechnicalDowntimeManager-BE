import { DepartmentType } from '../Department/types';
import { user } from './schema';
import { department } from '../Department/schema';

/**
 * Interface representing a user.
 *
 * This interface encapsulates the details of a user including their unique identifier, name, associated department, and role.
 *
 * Properties:
 * - `id` (string): Unique identifier for the user.
 * - `name` (string): Full name of the user.
 * - `department` (DepartmentType): Department to which the user belongs.
 * - `role` (string): Role or position of the user within the organization.
 */
export interface UserType {
  id: string;
  name: string;
  department: DepartmentType;
  role: string;
}

/**
 * Represents a user's selection within the system.
 *
 * @typedef {Object} userSelection
 * @property {number|string} id - The unique identifier of the user.
 * @property {string} name - The name of the user.
 * @property {Object} department - The department the user belongs to.
 * @property {number|string} department.id - The unique identifier of the department.
 * @property {string} department.name - The name of the department.
 * @property {string} role - The role assigned to the user within the system.
 */
export const userSelection = {
  id: user.id,
  name: user.name,
  department: {
    id: department.id,
    name: department.name
  },
  role: user.role
};

/**
 * An object containing selected user information.
 *
 * @typedef {Object} userInfoSelection
 * @property {string|number} id - The unique identifier of the user.
 * @property {string} name - The name of the user.
 */
export const userInfoSelection = {
  id: user.id,
  name: user.name
};

/**
 * Represents a subset of the `UserType` object containing specific details about a user.
 * This type definition includes only the `id` and `name` properties of `UserType`.
 *
 * Typically used to pass or retrieve lightweight user information where complete user details are not needed.
 */
export type UserInfo = Pick<UserType, 'id' | 'name'>;
