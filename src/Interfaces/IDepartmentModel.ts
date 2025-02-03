import { NewDepartment, Department } from '../features/Department/schema';
import { DepartmentQuery } from '../features/Department/utils';
import { IRepository } from './IRepository';
import { DepartmentType } from '../features/Department/types';

/**
 * IDepartmentModel interface.
 * This interface extends the IRepository interface, providing functionality
 * specific to department-related data operations.
 *
 * @extends IRepository
 * @template DepartmentQuery - The type representing query parameters for department operations.
 * @template NewDepartment - The type representing a new department object for creation operations.
 * @template Department - The type representing a department entity.
 * @template DepartmentType - The type representing the department type data.
 *
 * This interface is intended for managing department entities and defining
 * methods for querying, creating, updating, and deleting department data.
 */

// eslint-disable-next-line
export interface IDepartmentModel
  extends IRepository<DepartmentQuery, NewDepartment, Department, DepartmentType> {}
