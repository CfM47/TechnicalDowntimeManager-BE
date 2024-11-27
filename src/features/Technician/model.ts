import { ITechnicianModel } from '../Interfaces/ITechnician';
import { NewTechnician, technician, Technician } from '../../db/schemas/technician';
import { db } from '../../db/config/db_connect';
import { eq } from 'drizzle-orm';

export class TechnicianModel implements ITechnicianModel {
  async create(newTechnician: NewTechnician): Promise<Technician> {
    const createdTechnician = await db.insert(technician).values(newTechnician).returning();
    return createdTechnician[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(technician).where(eq(technician.id_user, id));
  }

  async getAll(): Promise<Technician[]> {
    return db.select().from(technician);
  }

  async getById(id: string): Promise<Technician | null> {
    const resultTechnician = await db
      .select()
      .from(technician)
      .where(eq(technician.id_user, id))
      .limit(1);
    return resultTechnician[0];
  }

  async update(id: string, technicianData: Partial<Technician>): Promise<Technician | null> {
    const updatedTechnician = await db
      .update(technician)
      .set(technicianData)
      .where(eq(technician.id_user, id))
      .returning();
    return updatedTechnician[0];
  }
}
