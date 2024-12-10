import { NewDowntime, downtime, Downtime } from './schema';
import { db } from '../../db/config/db_connect';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { and } from 'drizzle-orm';
import { DowntimeQuery, DowntimeQueryBuilder } from './utils';

export class DowntimeModel implements IDowntimeModel {
  async create(newDowntime: NewDowntime): Promise<Downtime> {
    const createdDowntime = await db.insert(downtime).values(newDowntime).returning();
    return createdDowntime[0];
  }

  async delete(keys: DowntimeQuery): Promise<void> {
    const filter = DowntimeQueryBuilder(keys);
    await db.delete(downtime).where(and(...filter));
  }

  async getAll(): Promise<Downtime[]> {
    return db.select().from(downtime);
  }

  async getById(keys: DowntimeQuery): Promise<Downtime | null> {
    const filter = DowntimeQueryBuilder(keys);
    const resultDowntime = await db
      .select()
      .from(downtime)
      .where(and(...filter))
      .limit(1);
    return resultDowntime[0];
  }

  async update(keys: DowntimeQuery, downtimeData: Partial<Downtime>): Promise<Downtime | null> {
    const filter = DowntimeQueryBuilder(keys);
    const updatedDowntime = await db
      .update(downtime)
      .set(downtimeData)
      .where(and(...filter))
      .returning();
    return updatedDowntime[0];
  }
}
