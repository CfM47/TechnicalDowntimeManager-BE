import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from './schema';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';
import { technicianSelection, TechnicianType } from './types';
import { user } from '../User/schema';
import { department } from '../Department/schema';

export class TechnicianModel implements ITechnicianModel {
  async create(newTechnician: NewTechnician): Promise<TechnicianType | null> {
    const [createdTechnician] = await db.insert(technician).values(newTechnician).returning();
    const query: TechnicianQuery = {
      id_user: createdTechnician.id_user
    };
    return await this.getById(query);
  }

  async delete(keys: TechnicianQuery): Promise<void> {
    const filter = TechnicianQueryBuilder(keys);
    await db.delete(technician).where(and(...filter));
  }

  async getAll(filter: TechnicianQuery): Promise<TechnicianType[]> {
    return db
      .select(technicianSelection)
      .from(technician)
      .innerJoin(user, eq(technician.id_user, user.id))
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...TechnicianQueryBuilder(filter)));
  }

  async getById(keys: TechnicianQuery): Promise<TechnicianType | null> {
    const filter = TechnicianQueryBuilder(keys);
    const [resultTechnician] = await db
      .select(technicianSelection)
      .from(technician)
      .innerJoin(user, eq(technician.id_user, user.id))
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...filter))
      .limit(1);
    return resultTechnician;
  }

  async update(
    keys: TechnicianQuery,
    technicianData: Partial<Technician>
  ): Promise<TechnicianType | null> {
    const filter = TechnicianQueryBuilder(keys);
    const [updatedTechnician] = await db
      .update(technician)
      .set(technicianData)
      .where(and(...filter))
      .returning();
    const query: TechnicianQuery = {
      id_user: updatedTechnician.id_user
    };
    return await this.getById(query);
  }
}
