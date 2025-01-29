import { downtime, Downtime, NewDowntime } from './schema';
import { db } from '../../db/config/db_connect';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { and, count, desc, eq, gte } from 'drizzle-orm';
import { DowntimeQuery, DowntimeQueryBuilder } from './utils';
import { downtimeSelection, DowntimeType } from './types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

export class DowntimeModel implements IDowntimeModel {
  /**
   * Creates a new downtime record.
   *
   * @param newDowntime - The new downtime data to be created.
   * @returns The created downtime record or null if creation failed.
   */
  async create(newDowntime: NewDowntime): Promise<DowntimeType | null> {
    const [createdDowntime] = await db.insert(downtime).values(newDowntime).returning();
    const query: DowntimeQuery = {
      id_sender: createdDowntime.id_sender,
      id_receiver: createdDowntime.id_receiver,
      id_equipment: createdDowntime.id_equipment,
      date: createdDowntime.date,
      id_dep_receiver: createdDowntime.id_dep_receiver
    };
    return await this.getById(query);
  }

  /**
   * Deletes a downtime record based on the provided keys.
   *
   * @param keys - The composite key to identify the downtime record to be deleted.
   */
  async delete(keys: DowntimeQuery): Promise<void> {
    const filter = DowntimeQueryBuilder(keys);
    await db.delete(downtime).where(and(...filter));
  }

  /**
   * Retrieves all downtime records based on the provided filter.
   *
   * @param filter - The filter criteria to retrieve downtime records.
   * @param pagination
   * @returns An array of downtime records matching the filter criteria.
   */
  async getAll(
    filter: DowntimeQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<DowntimeType>> {
    const filterQuery = DowntimeQueryBuilder(filter);
    const items = await db
      .select(downtimeSelection)
      .from(downtime)
      .innerJoin(alias(user, 'sender'), eq(downtime.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(downtime.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
      .innerJoin(department, eq(downtime.id_dep_receiver, department.id))
      .where(and(...filterQuery))
      .orderBy(desc(downtime.date))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(downtime, filterQuery)
    };
  }

  /**
   * Retrieves a downtime record by its composite key.
   *
   * @param keys - The composite key to identify the downtime record.
   * @returns The downtime record matching the composite key or null if not found.
   */
  async getById(keys: DowntimeQuery): Promise<DowntimeType | null> {
    const filter = DowntimeQueryBuilder(keys);
    const [resultDowntime] = await db
      .select(downtimeSelection)
      .from(downtime)
      .innerJoin(alias(user, 'sender'), eq(downtime.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(downtime.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
      .innerJoin(department, eq(downtime.id_dep_receiver, department.id))
      .where(and(...filter))
      .limit(1);
    return resultDowntime;
  }

  /**
   * Updates a downtime record by its composite key.
   *
   * @param keys - The composite key to identify the downtime record to be updated.
   * @param downtimeData - The partial downtime data to update.
   * @returns The updated downtime record or null if update failed.
   */
  async update(keys: DowntimeQuery, downtimeData: Partial<Downtime>): Promise<DowntimeType | null> {
    const filter = DowntimeQueryBuilder(keys);
    const [updatedDowntime] = await db
      .update(downtime)
      .set(downtimeData)
      .where(and(...filter))
      .returning();
    const query: DowntimeQuery = {
      id_sender: updatedDowntime.id_sender,
      id_receiver: updatedDowntime.id_receiver,
      id_equipment: updatedDowntime.id_equipment,
      date: updatedDowntime.date,
      id_dep_receiver: updatedDowntime.id_dep_receiver
    };
    return await this.getById(query);
  }

  /**
   * Retrieves downtime records for the last year with pagination.
   *
   * @param pagination - The pagination information to limit the number of records.
   * @returns An array of downtime records from the last year.
   * @throws Will throw an error if the database query fails.
   */
  async getLastYearDowntime(pagination: Pagination): Promise<PaginatedResponse<DowntimeType>> {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const items = await db
      .select(downtimeSelection)
      .from(downtime)
      .innerJoin(alias(user, 'sender'), eq(downtime.id_sender, alias(user, 'sender').id))
      .innerJoin(alias(user, 'receiver'), eq(downtime.id_receiver, alias(user, 'receiver').id))
      .innerJoin(equipment, eq(downtime.id_equipment, equipment.id))
      .innerJoin(department, eq(downtime.id_dep_receiver, department.id))
      .where(gte(downtime.date, oneYearAgo.toISOString()))
      .orderBy(desc(downtime.date))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    const [total] = await db
      .select({
        downtimesCount: count()
      })
      .from(downtime)
      .where(gte(downtime.date, oneYearAgo.toISOString()));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: total?.downtimesCount ?? 0
    };
  }
}
