import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from './schema';
import { db } from '../../db/config/db_connect';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';
import {
  TechnicianPerformanceSelection,
  TechnicianPerformanceType,
  technicianSelection,
  TechnicianType
} from './types';
import { user } from '../User/schema';
import { department } from '../Department/schema';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';
import { rate } from '../Rate/schema';
import { maintenance } from '../Maintenance/schema';

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

  /**
   * Retrieves all technicians based on a filter.
   *
   * @param filter - The filter to apply when retrieving technicians.
   * @param pagination
   * @returns An array of technicians matching the filter.
   */
  async getAll(
    filter: TechnicianQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianType>> {
    const filterQuery = TechnicianQueryBuilder(filter);
    const items = await db
      .select(technicianSelection)
      .from(technician)
      .innerJoin(user, eq(technician.id_user, user.id))
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...filterQuery))
      .orderBy(asc(user.name))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(technician, filterQuery)
    };
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

  async getTechniciansPerformance(
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianPerformanceType>> {
    const items = await db
      .select(TechnicianPerformanceSelection)
      .from(technician)
      .innerJoin(user, eq(technician.id_user, user.id))
      .leftJoin(rate, eq(technician.id_user, rate.id_technician))
      .leftJoin(maintenance, eq(technician.id_user, maintenance.id_technician))
      .groupBy(technician.id_user, user.name)
      .orderBy(desc(sql`score_avg`))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));

    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(technician, [])
    };
  }
}
