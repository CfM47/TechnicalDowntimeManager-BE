import {NewDowntime, downtime, Downtime} from "../../db/schemas/downtime";
import {db} from "../../db/config/db_connect";
import {IDowntimeModel} from "../Interfaces/IDowntimeModel";
import {and, SQL} from "drizzle-orm";

export class DowntimeModel implements IDowntimeModel {
  async create(newDowntime: NewDowntime): Promise<Downtime> {
    const createdDowntime = await db.insert(downtime).values(newDowntime).returning();
    return createdDowntime[0];
  }

  async delete(keys: SQL[]): Promise<void> {
    await db.delete(downtime).where(and(...keys));
  }

  async getAll(): Promise<Downtime[]> {
    return db.select().from(downtime);
  }

  async getById(keys: SQL[]): Promise<Downtime | null> {
    const resultDowntime = await db.select().from(downtime).where(and(...keys)).limit(1);
    return resultDowntime[0];
  }

  async update(keys: SQL[], downtimeData: Partial<Downtime>): Promise<Downtime | null> {
    const updatedDowntime = await db.update(downtime).set(downtimeData).where(and(...keys)).returning();
    return updatedDowntime[0];
  }
}