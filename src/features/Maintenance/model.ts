import {NewMaintenance, maintenance, Maintenance} from "../../db/schemas/maintenance";
import {db} from "../../db/config/db_connect";
import {IMaintenanceModel} from "../Interfaces/IMaintenanceModel";
import {and, SQL} from "drizzle-orm";

export class MaintenanceModel implements IMaintenanceModel {
  async create(newMaintenance: NewMaintenance): Promise<Maintenance> {
    const createdMaintenance = await db.insert(maintenance).values(newMaintenance).returning();
    return createdMaintenance[0];
  }

  async delete(keys: SQL[]): Promise<void> {
    await db.delete(maintenance).where(and(...keys));
  }

  async getAll(): Promise<Maintenance[]> {
    return db.select().from(maintenance);
  }

  async getById(keys: SQL[]): Promise<Maintenance | null> {
    const resultMaintenance = await db.select().from(maintenance).where(and(...keys)).limit(1);
    return resultMaintenance[0];
  }

  async update(keys: SQL[], maintenanceData: Partial<Maintenance>): Promise<Maintenance | null> {
    const updatedMaintenance = await db.update(maintenance).set(maintenanceData).where(and(...keys)).returning();
    return updatedMaintenance[0];
  }
}