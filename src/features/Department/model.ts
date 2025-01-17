import { department } from './schema';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { DepartmentQuery, DepartmentQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class DepartmentModel extends IRepository<DepartmentQuery> implements IDepartmentModel {
  constructor() {
    super(department, DepartmentQueryBuilder);
  }
}
