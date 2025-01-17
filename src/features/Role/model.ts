import { IRoleModel } from '../../Interfaces/IRoleModel';
import { role } from './schema';
import { RoleQuery, RoleQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class RoleModel extends IRepository<RoleQuery> implements IRoleModel {
  constructor() {
    super(role, RoleQueryBuilder);
  }
}
