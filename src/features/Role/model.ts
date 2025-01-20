import { IRoleModel } from '../../Interfaces/IRoleModel';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { NewRole, Role, role } from './schema';
import { RoleQuery, RoleQueryBuilder } from './utils';
import { roleSelection, RoleType } from './types';

export class RoleModel implements IRoleModel {
  async create(newRole: NewRole): Promise<RoleType | null> {
    const [createdRole] = await db.insert(role).values(newRole).returning();
    return createdRole;
  }
  async delete(keys: RoleQuery): Promise<void> {
    const filter = RoleQueryBuilder(keys);
    await db.delete(role).where(and(...filter));
  }

  async getAll(): Promise<RoleType[]> {
    return db.select(roleSelection).from(role);
  }

  async getById(keys: RoleQuery): Promise<RoleType | null> {
    const filter = RoleQueryBuilder(keys);
    const [resultRole] = await db
      .select(roleSelection)
      .from(role)
      .where(and(...filter))
      .limit(1);
    return resultRole;
  }

  async update(keys: RoleQuery, technicianData: Partial<Role>): Promise<RoleType | null> {
    const filter = RoleQueryBuilder(keys);
    const [updatedRole] = await db
      .update(role)
      .set(technicianData)
      .where(and(...filter))
      .returning();
    return updatedRole;
  }
}
