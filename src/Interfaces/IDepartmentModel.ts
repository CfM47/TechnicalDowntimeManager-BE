import { NewDepartment, Department } from '../features/Department/schema';
import { DepartmentQuery } from '../features/Department/utils';
import { IRepository } from './IRepository';
import { DepartmentType } from '../features/Department/types';

/**
 * Interface for the Department model, extending the generic repository interface.
 */

// eslint-disable-next-line
export interface IDepartmentModel
  extends IRepository<DepartmentQuery, NewDepartment, Department, DepartmentType> {}
