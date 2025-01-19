import { department } from './schema';

export interface DepartmentType {
  id: string;
  name: string;
}

export const departmentSelection = {
  id: department.id,
  name: department.name
};
