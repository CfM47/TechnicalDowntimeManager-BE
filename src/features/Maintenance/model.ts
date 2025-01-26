import { NewMaintenance, maintenance, Maintenance } from './schema';
import { db } from '../../db/config/db_connect';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { and, eq } from 'drizzle-orm';
import { MaintenanceQuery, MaintenanceQueryBuilder } from './utils';
import { maintenanceSelection, MaintenanceType } from './types';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { Pagination } from '../../utils';

export class MaintenanceModel implements IMaintenanceModel {
  async create(newMaintenance: NewMaintenance): Promise<MaintenanceType | null> {
    const [createdMaintenance] = await db.insert(maintenance).values(newMaintenance).returning();
    const query: MaintenanceQuery = {
      id_technician: createdMaintenance.id_technician,
      id_equipment: createdMaintenance.id_equipment,
      date: createdMaintenance.date
    };
    return await this.getById(query);
  }

  async delete(keys: MaintenanceQuery): Promise<void> {
    const filter = MaintenanceQueryBuilder(keys);
    await db.delete(maintenance).where(and(...filter));
  }

  async getAll(filter: MaintenanceQuery, pagination: Pagination): Promise<MaintenanceType[]> {
    return db
      .select(maintenanceSelection)
      .from(maintenance)
      .innerJoin(user, eq(maintenance.id_technician, user.id))
      .innerJoin(equipment, eq(maintenance.id_equipment, equipment.id))
      .where(and(...MaintenanceQueryBuilder(filter)))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
  }

  async getById(keys: MaintenanceQuery): Promise<MaintenanceType | null> {
    const filter = MaintenanceQueryBuilder(keys);
    const [resultMaintenance] = await db
      .select(maintenanceSelection)
      .from(maintenance)
      .innerJoin(user, eq(maintenance.id_technician, user.id))
      .innerJoin(equipment, eq(maintenance.id_equipment, equipment.id))
      .where(and(...filter))
      .limit(1);
    return resultMaintenance;
  }

  async update(
    keys: MaintenanceQuery,
    maintenanceData: Partial<Maintenance>
  ): Promise<MaintenanceType | null> {
    const filter = MaintenanceQueryBuilder(keys);
    const [updatedMaintenance] = await db
      .update(maintenance)
      .set(maintenanceData)
      .where(and(...filter))
      .returning();
    const query: MaintenanceQuery = {
      id_technician: updatedMaintenance.id_technician,
      id_equipment: updatedMaintenance.id_equipment,
      date: updatedMaintenance.date
    };
    return await this.getById(query);
  }
}
