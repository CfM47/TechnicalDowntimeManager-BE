import { ITechnicianModel } from '../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from '../../db/schemas/technician';
import { db } from '../../db/config/db_connect';
import { and, eq, SQL } from 'drizzle-orm';

export class TechnicianModel implements ITechnicianModel {
  async create(newTechnician: NewTechnician): Promise<Technician> {
    const createdTechnician = await db.insert(technician).values(newTechnician).returning();
    return createdTechnician[0];
  }

  async delete(keys: SQL[]): Promise<void> {
    await db.delete(technician).where(and(...keys));
  }

  async getAll(): Promise<Technician[]> {
    return db.select().from(technician);
  }

  async getById(keys: SQL[]): Promise<Technician | null> {
    const resultTechnician = await db
      .select()
      .from(technician)
      .where(and(...keys))
      .limit(1);
    return resultTechnician[0];
  }

  async update(keys : SQL[], technicianData: Partial<Technician>): Promise<Technician | null> {
    const updatedTechnician = await db
      .update(technician)
      .set(technicianData)
      .where(and(...keys))
      .returning();
    return updatedTechnician[0];
  }
}
