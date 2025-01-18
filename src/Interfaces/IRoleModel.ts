import { Role, NewRole } from '../features/Role/schema';
import { RoleQuery } from '../features/Role/utils';

export interface IRoleModel {
  create(newRole: NewRole): Promise<Role>;

  getAll(): Promise<Role[]>;

  getById(keys: RoleQuery): Promise<Role | null>;

  update(keys: RoleQuery, roleData: Partial<Role>): Promise<Role | null>;

  delete(keys: RoleQuery): Promise<void>;
}
