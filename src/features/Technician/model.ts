import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from './schema';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';

export class TechnicianModel implements ITechnicianModel {
  async create(newTechnician: NewTechnician): Promise<Technician> {
    const createdTechnician = await db.insert(technician).values(newTechnician).returning();
    return createdTechnician[0];
  }

  async delete(keys: TechnicianQuery): Promise<void> {
    const filter = TechnicianQueryBuilder(keys);
    await db.delete(technician).where(and(...filter));
  }

  async getAll(): Promise<Technician[]> {
    return db.select().from(technician);
  }

  async getById(keys: TechnicianQuery): Promise<Technician | null> {
    const filter = TechnicianQueryBuilder(keys);
    const resultTechnician = await db
      .select()
      .from(technician)
      .where(and(...filter))
      .limit(1);
    return resultTechnician[0];
  }

  async update(
    keys: TechnicianQuery,
    technicianData: Partial<Technician>
  ): Promise<Technician | null> {
    const filter = TechnicianQueryBuilder(keys);
    const updatedTechnician = await db
      .update(technician)
      .set(technicianData)
      .where(and(...filter))
      .returning();
    return updatedTechnician[0];
  }
}
