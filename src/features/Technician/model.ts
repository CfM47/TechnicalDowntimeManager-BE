import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician, technician, Technician } from './schema';
import { db } from '../../db/config/db_connect';
import { and, asc, desc, eq, or, sql } from 'drizzle-orm';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';
import {
  TechnicianInterventionType,
  TechnicianPerformanceSelection,
  TechnicianPerformanceType,
  TechniciansDowntimesInterventions,
  technicianSelection,
  TechniciansMaintenancesInterventions,
  TechniciansRatesInterventions,
  TechnicianType
} from './types';
import { user } from '../User/schema';
import { department } from '../Department/schema';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';
import { rate } from '../Rate/schema';
import { maintenance } from '../Maintenance/schema';
import { equipment } from '../Equipment/schema';
import { downtime } from '../Downtime/schema';
import { unionAll } from 'drizzle-orm/pg-core';
import { role } from '../Role/schema';

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
      .innerJoin(role, eq(user.id_role, role.id))
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
      .innerJoin(role, eq(user.id_role, role.id))
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

  /**
   * Retrieves intervention data for a technician.
   *
   * @param technicianId - The ID of the technician.
   * @param pagination - The pagination information.
   * @returns A paginated response containing the technician's intervention data.
   */
  async getInterventionData(
    technicianId: string,
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianInterventionType>> {
    const technicianRateQuery = db
      .select(TechniciansRatesInterventions)
      .from(technician)
      .innerJoin(rate, eq(rate.id_technician, technician.id_user))
      .where(eq(technician.id_user, technicianId));

    const technicianMaintenanceQuery = db
      .select(TechniciansMaintenancesInterventions)
      .from(technician)
      .innerJoin(maintenance, eq(maintenance.id_technician, technician.id_user))
      .innerJoin(equipment, eq(equipment.id, maintenance.id_equipment))
      .where(eq(technician.id_user, technicianId));

    const technicianDowntimeQuery = db
      .select(TechniciansDowntimesInterventions)
      .from(technician)
      .innerJoin(
        downtime,
        or(eq(downtime.id_receiver, technician.id_user), eq(downtime.id_sender, technician.id_user))
      )
      .innerJoin(equipment, eq(equipment.id, downtime.id_equipment))
      .where(eq(technician.id_user, technicianId));

    const totalRate = countTableRows(rate, [eq(rate.id_technician, technicianId)]);
    const totalMaintenance = countTableRows(maintenance, [
      eq(maintenance.id_technician, technicianId)
    ]);
    const totalDowntime = countTableRows(downtime, [
      eq(downtime.id_receiver, technicianId),
      eq(downtime.id_sender, technicianId)
    ]);

    const total = await Promise.all([totalRate, totalMaintenance, totalDowntime]).then((values) => {
      return values.reduce((acc, curr) => acc + curr, 0);
    });

    const result: TechnicianInterventionType[] = await unionAll(
      technicianRateQuery,
      technicianMaintenanceQuery,
      technicianDowntimeQuery
    )
      .orderBy(maintenance.date)
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));

    return {
      items: result,
      page: pagination.page,
      size: pagination.size,
      total
    };
  }

  /**
   * Retrieves the performance data of all technicians.
   *
   * @param pagination - The pagination information.
   * @returns A paginated response containing the performance data of technicians.
   */
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
