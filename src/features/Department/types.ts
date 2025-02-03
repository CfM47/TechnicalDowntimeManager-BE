import { department } from './schema';
/**
 * Represents a department type with an identifier and a name.
 *
 * This interface is used to model the structure of a department entity
 * containing essential attributes such as its unique identifier and the name of the department.
 */
export interface DepartmentType {
  id: string;
  name: string;
}

/**
 * An object representing the selected department's details.
 *
 * @typedef {Object} departmentSelection
 * @property {number|string} id - The unique identifier of the selected department.
 * @property {string} name - The name of the selected department.
 */
export const departmentSelection = {
  id: department.id,
  name: department.name
};
