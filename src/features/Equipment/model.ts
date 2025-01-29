import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { equipment, Equipment, NewEquipment } from './schema';
import { db } from '../../db/config/db_connect';
import { and, count, desc, eq, gt, gte } from 'drizzle-orm';
import { EquipmentQuery, EquipmentQueryBuilder } from './utils';
import {
  EquipmentOrderBy,
  equipmentSelection,
  equipmentsWithMaintenancesSelection,
  EquipmentType,
  EquipmentWithMaintenances
} from './types';
import { department } from '../Department/schema';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';
import { maintenance } from '../Maintenance/schema';

/**
 * Model for handling CRUD operations on equipment.
 *
 * This model provides methods to create, retrieve, update, and delete
 * equipment records. It uses the database connection to interact with
 * the equipment table and performs necessary operations based on the
 * provided queries.
 */
export class EquipmentModel implements IEquipmentModel {
  /**
   * Creates a new equipment record.
   *
   * Inserts a new equipment record into the database and returns the created record.
   *
   * @param newEquipment - The new equipment data to be inserted.
   * @returns The created equipment record.
   */
  async create(newEquipment: NewEquipment): Promise<EquipmentType | null> {
    const [createdEquipment] = await db.insert(equipment).values(newEquipment).returning();
    const query: EquipmentQuery = { id: createdEquipment.id };
    return await this.getById(query);
  }

  /**
   * Deletes an equipment record.
   *
   * Removes the specified equipment record from the database.
   *
   * @param keys - The query keys to identify the equipment record to be deleted.
   */
  async delete(keys: EquipmentQuery): Promise<void> {
    const filter = EquipmentQueryBuilder(keys);
    await db.delete(equipment).where(and(...filter));
  }

  /**
   * Retrieves all equipment records.
   *
   * Fetches all equipment records from the database based on the provided filter.
   *
   * @param filter - The query filter to apply.
   * @param pagination
   * @param orderBy
   * @returns An array of equipment records.
   */
  async getAll(
    filter: EquipmentQuery,
    pagination: Pagination,
    orderBy?: string
  ): Promise<PaginatedResponse<EquipmentType>> {
    const orderParam =
      EquipmentOrderBy[orderBy as keyof typeof EquipmentOrderBy] ?? equipment.acquisition_date;
    const filterQuery = EquipmentQueryBuilder(filter);
    const items = await db
      .select(equipmentSelection)
      .from(equipment)
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(and(...filterQuery))
      .orderBy(desc(orderParam))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(equipment, filterQuery)
    };
  }

  /**
   * Retrieves an equipment record by ID.
   *
   * Fetches a single equipment record from the database based on the provided query keys.
   *
   * @param keys - The query keys to identify the equipment record.
   * @returns The equipment record, or null if not found.
   */
  async getById(keys: EquipmentQuery): Promise<EquipmentType | null> {
    const filter = EquipmentQueryBuilder(keys);
    const [resultEquipment] = await db
      .select(equipmentSelection)
      .from(equipment)
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(and(...filter))
      .limit(1);
    return resultEquipment;
  }

  /**
   * Updates an equipment record.
   *
   * Updates the specified equipment record in the database and returns the updated record.
   *
   * @param keys - The query keys to identify the equipment record to be updated.
   * @param equipmentData - The new data to update the equipment record with.
   * @returns The updated equipment record, or null if not found.
   */
  async update(
    keys: EquipmentQuery,
    equipmentData: Partial<Equipment>
  ): Promise<EquipmentType | null> {
    const filter = EquipmentQueryBuilder(keys);
    const [updatedEquipment] = await db
      .update(equipment)
      .set(equipmentData)
      .where(and(...filter))
      .returning();
    const query: EquipmentQuery = { id: updatedEquipment.id };
    return await this.getById(query);
  }

  async getEquipmentsWithFrequentMaintenances(
    pagination: Pagination
  ): Promise<PaginatedResponse<EquipmentWithMaintenances>> {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const items = await db
      .select(equipmentsWithMaintenancesSelection)
      .from(equipment)
      .innerJoin(maintenance, eq(equipment.id, maintenance.id_equipment))
      .innerJoin(department, eq(equipment.id_department, department.id))
      .where(gte(maintenance.date, oneYearAgo.toISOString()))
      .limit(pagination.size)
      .groupBy(equipment.id, department.id)
      .offset(pagination.size * (pagination.page - 1))
      .having(({ totalMaintenances }) => gt(totalMaintenances, 3));

    const totalQuery = await db.select({ count: count() }).from(
      db
        .select({ id: equipment.id })
        .from(equipment)
        .innerJoin(maintenance, eq(equipment.id, maintenance.id_equipment))
        .where(gte(maintenance.date, oneYearAgo.toISOString()))
        .groupBy(equipment.id)
        .having(({ id }) => gt(count(id), 3))
        .as('subquery')
    );

    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: totalQuery[0]?.count ?? 0
    };
  }
}
