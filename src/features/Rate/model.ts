import { rate, Rate, NewRate } from "../../db/schemas/rate";
import { IRateModel } from '../Interfaces/IRateModel';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';

export class RateModel implements IRateModel {

  async getById(id_technician: string, id_user: string): Promise<Rate | null> {
    const [foundRate] = await db
      .select()
      .from(rate)
      .where(and(eq(rate.id_technician, id_technician), eq(rate.id_user, id_user)));
    return foundRate || null;
  }

  async update(id_technician: string, id_user: string , rateData: Partial<Rate>): Promise<Rate | null> {
    const [updatedRate] = await db
      .update(rate)
      .set(rateData)
      .where(and(eq(rate.id_technician,id_technician), eq(rate.id_user,id_user)))
      .returning();
    return updatedRate || null;
  }
  async delete(id_technician: string, id_user: string): Promise<void> {
    await db.delete(rate).where(and(eq(rate.id_technician,id_technician),(eq(rate.id_user,id_user))));
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
