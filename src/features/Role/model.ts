import { IRoleModel } from '../Interfaces/IRoleModel';
import { db } from '../../db/config/db_connect';
import { and, SQL } from 'drizzle-orm';
import { NewRole, Role, role } from '../../db/schemas/role';

export class RoleModel implements IRoleModel {
  async create(newRole: NewRole): Promise<Role> {
    const [createdRate] = await db
      .insert(role)
      .values(newRole)
      .returning();
    return createdRate;
  }
  async delete(keys : SQL[]): Promise<void> {
    await db.delete(role).where(and(...keys));
  }

  async getAll(): Promise<Role[]> {
    return db.select().from(role);
  }

  async getById(keys : SQL[]): Promise<Role | null> {
    const resultTechnician = await db
      .select()
      .from(role)
      .where(and(...keys))
      .limit(1);
    return resultTechnician[0];
  }

  async update(keys : SQL[], technicianData: Partial<Role>): Promise<Role | null> {
    const updatedTechnician = await db
      .update(role)
      .set(technicianData)
      .where(and(...keys))
      .returning();
    return updatedTechnician[0];
  }
}