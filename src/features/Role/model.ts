import { IRoleModel } from '../../Interfaces/IRoleModel';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { NewRole, Role, role } from './schema';
import { RoleQuery, RoleQueryBuilder } from './utils';

export class RoleModel implements IRoleModel {
  async create(newRole: NewRole): Promise<Role> {
    const [createdRate] = await db.insert(role).values(newRole).returning();
    return createdRate;
  }
  async delete(keys: RoleQuery): Promise<void> {
    const filter = RoleQueryBuilder(keys);
    await db.delete(role).where(and(...filter));
  }

  async getAll(): Promise<Role[]> {
    return db.select().from(role);
  }

  async getById(keys: RoleQuery): Promise<Role | null> {
    const filter = RoleQueryBuilder(keys);
    const resultTechnician = await db
      .select()
      .from(role)
      .where(and(...filter))
      .limit(1);
    return resultTechnician[0];
  }

  async update(keys: RoleQuery, technicianData: Partial<Role>): Promise<Role | null> {
    const filter = RoleQueryBuilder(keys);
    const updatedTechnician = await db
      .update(role)
      .set(technicianData)
      .where(and(...filter))
      .returning();
    return updatedTechnician[0];
  }
}
