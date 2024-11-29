import { rate, Rate, NewRate } from "../../db/schemas/rate";
import { IRateModel } from '../Interfaces/IRateModel';
import { db } from '../../db/config/db_connect';
import { and, SQL } from 'drizzle-orm';

export class RateModel implements IRateModel {

  async getById(keys : SQL[]): Promise<Rate | null> {
    const [foundRate] = await db
      .select()
      .from(rate)
      .where(and(...keys)).limit(1);
    return foundRate || null;
  }

  async update(keys: SQL[], rateData: Partial<Rate>): Promise<Rate | null> {
    const [updatedRate] = await db
      .update(rate)
      .set(rateData)
      .where(and(...keys))
      .returning();
    return updatedRate || null;
  }
  async delete(keys: SQL[]): Promise<void> {
    await db.delete(rate).where(and(...keys));
  }

  async getAll(): Promise<Rate[]> {
    return db.select().from(rate);
  }

  async create(newRate: NewRate): Promise<Rate> {
    const [createdRate] = await db
      .insert(rate)
      .values(newRate)
      .returning();
      return createdRate;
  }
}
