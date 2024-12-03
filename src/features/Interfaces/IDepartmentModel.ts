import { NewDepartment, Department } from '../../db/schemas/department';
import { SQL } from 'drizzle-orm';

export interface IDepartmentModel {

  create(newDepartment: NewDepartment): Promise<Department>;

  getAll(): Promise<Department[]>;

  getById(keys : SQL[]): Promise<Department | null>;

  update(keys: SQL[], rateData : Partial<Department>): Promise<Department | null>;

  delete(keys: SQL[]): Promise<void>;
}