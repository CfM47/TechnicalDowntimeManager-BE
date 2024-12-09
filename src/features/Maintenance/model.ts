import { NewMaintenance, maintenance, Maintenance } from './schema';
import { db } from '../../db/config/db_connect';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { and } from 'drizzle-orm';
import { MaintenanceQuery, MaintenanceQueryBuilder } from './utils';

export class MaintenanceModel implements IMaintenanceModel {
  async create(newMaintenance: NewMaintenance): Promise<Maintenance> {
    const createdMaintenance = await db.insert(maintenance).values(newMaintenance).returning();
    return createdMaintenance[0];
  }

  async delete(keys: MaintenanceQuery): Promise<void> {
    const filter = MaintenanceQueryBuilder(keys);
    await db.delete(maintenance).where(and(...filter));
  }

  async getAll(): Promise<Maintenance[]> {
    return db.select().from(maintenance);
  }

  async getById(keys: MaintenanceQuery): Promise<Maintenance | null> {
    const filter = MaintenanceQueryBuilder(keys);
    const resultMaintenance = await db
      .select()
      .from(maintenance)
      .where(and(...filter))
      .limit(1);
    return resultMaintenance[0];
  }

  async update(
    keys: MaintenanceQuery,
    maintenanceData: Partial<Maintenance>
  ): Promise<Maintenance | null> {
    const filter = MaintenanceQueryBuilder(keys);
    const updatedMaintenance = await db
      .update(maintenance)
      .set(maintenanceData)
      .where(and(...filter))
      .returning();
    return updatedMaintenance[0];
  }
}
