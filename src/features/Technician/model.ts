import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from './schema';
import { db } from '../../db/config/db_connect';
import { and, asc, eq } from 'drizzle-orm';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';
import { technicianSelection, TechnicianType } from './types';
import { user } from '../User/schema';
import { department } from '../Department/schema';
import { Pagination } from '../../utils';

/**
 * Model for managing technicians.
 *
 * This model provides methods to:
 * - Create a new technician
 * - Retrieve all technicians
 * - Retrieve a technician by ID
 * - Update a technician by ID
 * - Delete a technician by ID
 */
export class TechnicianModel implements ITechnicianModel {
  /**
   * Creates a new technician.
   *
   * @param newTechnician - The data for the new technician.
   * @returns The created technician or null if creation failed.
   */
  async create(newTechnician: NewTechnician): Promise<TechnicianType | null> {
    const [createdTechnician] = await db.insert(technician).values(newTechnician).returning();
    const query: TechnicianQuery = {
      id_user: createdTechnician.id_user
    };
    return await this.getById(query);
  }

  /**
   * Deletes a technician by query.
   *
   * @param keys - The query to identify the technician to delete.
   */
  async delete(keys: TechnicianQuery): Promise<void> {
    const filter = TechnicianQueryBuilder(keys);
    await db.delete(technician).where(and(...filter));
  }

  async getAll(filter: TechnicianQuery, pagination: Pagination): Promise<TechnicianType[]> {
    /**
     * Retrieves all technicians based on a filter.
     *
     * @param filter - The filter to apply when retrieving technicians.
     * @returns An array of technicians matching the filter.
     */
    return db
      .select(technicianSelection)
      .from(technician)
      .innerJoin(user, eq(technician.id_user, user.id))
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...TechnicianQueryBuilder(filter)))
      .orderBy(asc(user.name))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
  }

  /**
   * Retrieves a technician by query.
   *
   * @param keys - The query to identify the technician.
   * @returns The technician matching the query or null if not found.
   */
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

  /**
   * Updates a technician by query.
   *
   * @param keys - The query to identify the technician to update.
   * @param technicianData - The data to update the technician with.
   * @returns The updated technician or null if update failed.
   */
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
