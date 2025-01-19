import { rate, Rate, NewRate } from './schema';
import { IRateModel } from '../../Interfaces/IRateModel';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { RateQuery, RateQueryBuilder } from './utils';
import { rateSelection, RateType } from './types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';

export class RateModel implements IRateModel {
  async getById(keys: RateQuery): Promise<RateType | null> {
    const filter = RateQueryBuilder(keys);
    const [resultRate] = await db
      .select(rateSelection)
      .from(rate)
      .innerJoin(alias(user, 'technician'), eq(rate.id_technician, alias(user, 'technician').id))
      .innerJoin(user, eq(rate.id_user, user.id))
      .where(and(...filter))
      .limit(1);
    return resultRate;
  }

  async update(keys: RateQuery, rateData: Partial<Rate>): Promise<RateType | null> {
    const filter = RateQueryBuilder(keys);
    const [updatedRate] = await db
      .update(rate)
      .set(rateData)
      .where(and(...filter))
      .returning();
    const query: RateQuery = {
      id_technician: updatedRate.id_technician,
      id_user: updatedRate.id_user,
      date: updatedRate.date
    };
    return await this.getById(query);
  }
  async delete(keys: RateQuery): Promise<void> {
    const filter = RateQueryBuilder(keys);
    await db.delete(rate).where(and(...filter));
  }

  async getAll(): Promise<RateType[]> {
    return db
      .select(rateSelection)
      .from(rate)
      .innerJoin(alias(user, 'technician'), eq(rate.id_technician, alias(user, 'technician').id))
      .innerJoin(user, eq(rate.id_user, user.id));
  }

  async create(newRate: NewRate): Promise<RateType | null> {
    const [createdRate] = await db.insert(rate).values(newRate).returning();
    const query: RateQuery = {
      id_technician: createdRate.id_technician,
      id_user: createdRate.id_user,
      date: createdRate.date
    };
    return await this.getById(query);
  }
}
