import { rate, Rate, NewRate } from './schema';
import { IRateModel } from '../../Interfaces/IRateModel';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { RateQuery, RateQueryBuilder } from './utils';

export class RateModel implements IRateModel {
  async getById(keys: RateQuery): Promise<Rate | null> {
    const filter = RateQueryBuilder(keys);
    const [foundRate] = await db
      .select()
      .from(rate)
      .where(and(...filter))
      .limit(1);
    return foundRate || null;
  }

  async update(keys: RateQuery, rateData: Partial<Rate>): Promise<Rate | null> {
    const filter = RateQueryBuilder(keys);
    const [updatedRate] = await db
      .update(rate)
      .set(rateData)
      .where(and(...filter))
      .returning();
    return updatedRate || null;
  }
  async delete(keys: RateQuery): Promise<void> {
    const filter = RateQueryBuilder(keys);
    await db.delete(rate).where(and(...filter));
  }

  async getAll(): Promise<Rate[]> {
    return db.select().from(rate);
  }

  async create(newRate: NewRate): Promise<Rate> {
    const [createdRate] = await db.insert(rate).values(newRate).returning();
    return createdRate;
  }
}
