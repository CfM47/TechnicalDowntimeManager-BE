import { NewDepartment, Department } from '../features/Department/schema';
import { DepartmentQuery } from '../features/Department/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface IDepartmentModel extends IRepository<DepartmentQuery, NewDepartment, Department> {}
