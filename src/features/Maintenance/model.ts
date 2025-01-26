import { NewMaintenance, maintenance, Maintenance } from './schema';
import { db } from '../../db/config/db_connect';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { and, eq } from 'drizzle-orm';
import { MaintenanceQuery, MaintenanceQueryBuilder } from './utils';
import { maintenanceSelection, MaintenanceType } from './types';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';

/**
 * Model for handling CRUD operations on the `Maintenance` resource.
 *
 * This model provides methods to create, retrieve, update, and delete maintenance records.
 * Each method interacts with the database to perform the necessary operations.
 */
export class MaintenanceModel implements IMaintenanceModel {

  /**
   * Creates a new maintenance record.
   *
   * @param newMaintenance - The data for the new maintenance record.
   * @returns The created maintenance record or null if creation failed.
   */
  async create(newMaintenance: NewMaintenance): Promise<MaintenanceType | null> {
    const [createdMaintenance] = await db.insert(maintenance).values(newMaintenance).returning();
    const query: MaintenanceQuery = {
      id_technician: createdMaintenance.id_technician,
      id_equipment: createdMaintenance.id_equipment,
      date: createdMaintenance.date
    };
    return await this.getById(query);
  }

  /**
   * Deletes a maintenance record.
   *
   * @param keys - The keys identifying the maintenance record to delete.
   */
  async delete(keys: MaintenanceQuery): Promise<void> {
    const filter = MaintenanceQueryBuilder(keys);
    await db.delete(maintenance).where(and(...filter));
  }

  /**
   * Retrieves all maintenance records based on the provided filter.
   *
   * @param filter - The filter criteria for retrieving maintenance records.
   * @returns A list of maintenance records matching the filter criteria.
   */
  async getAll(filter: MaintenanceQuery): Promise<MaintenanceType[]> {
    return db
      .select(maintenanceSelection)
      .from(maintenance)
      .innerJoin(user, eq(maintenance.id_technician, user.id))
      .innerJoin(equipment, eq(maintenance.id_equipment, equipment.id))
      .where(and(...MaintenanceQueryBuilder(filter)));
  }

  /**
   * Retrieves a maintenance record by its keys.
   *
   * @param keys - The keys identifying the maintenance record to retrieve.
   * @returns The maintenance record matching the keys or null if not found.
   */
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

  /**
   * Updates a maintenance record.
   *
   * @param keys - The keys identifying the maintenance record to update.
   * @param maintenanceData - The data to update the maintenance record with.
   * @returns The updated maintenance record or null if update failed.
   */
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
