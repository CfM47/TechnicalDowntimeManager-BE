import { Role, NewRole } from '../../db/schemas/role';
import { SQL } from 'drizzle-orm';

export interface IRoleModel {
  create(newRole: NewRole): Promise<Role>;

  getAll(): Promise<Role[]>;

  getById(keys : SQL[]): Promise<Role | null>;

  update(keys : SQL[], roleData: Partial<Role>): Promise<Role | null>;

  delete(keys : SQL[]): Promise<void>;
}
