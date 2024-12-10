import { NewDepartment, Department } from '../features/Department/schema';
import { DepartmentQuery } from '../features/Department/utils';

export interface IDepartmentModel {
  create(newDepartment: NewDepartment): Promise<Department>;

  getAll(): Promise<Department[]>;

  getById(keys: DepartmentQuery): Promise<Department | null>;

  update(keys: DepartmentQuery, departmentData: Partial<Department>): Promise<Department | null>;

  delete(keys: DepartmentQuery): Promise<void>;
}
