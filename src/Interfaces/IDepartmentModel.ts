import { DepartmentQuery } from '../features/Department/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDepartmentModel extends IRepository<DepartmentQuery> {}
