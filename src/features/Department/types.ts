import { department } from './schema';
/**
 * Represents the type for a department.
 */
export interface DepartmentType {
  id: string;
  name: string;
}

/**
 * Defines the selection fields for a department.
 */
export const departmentSelection = {
  id: department.id,
  name: department.name
};