import { rate, Rate, NewRate } from './schema';
import { IRateModel } from '../../Interfaces/IRateModel';
import { db } from '../../db/config/db_connect';
import { and, desc, eq } from 'drizzle-orm';
import { RateQuery, RateQueryBuilder } from './utils';
import { RateOrderBy, rateSelection, RateType } from './types';
import { alias } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

/**
 * Model class for handling CRUD operations on Rate entities.
 *
 * This class provides methods to create, retrieve, update, and delete rates.
 * Each method interacts with the database to perform the necessary operations.
 */
export class RateModel implements IRateModel {
  /**
   * Retrieves a rate by its ID.
   *
   * @param keys - The query parameters to identify the rate.
   * @returns A promise that resolves to the rate if found, otherwise null.
   */
  async getById(keys: RateQuery): Promise<RateType | null> {
    const filter = RateQueryBuilder(keys);
    const [resultRate] = await db
      .select(rateSelection)
      .from(rate)
      .innerJoin(alias(user, 'technician'), eq(rate.id_technician, alias(user, 'technician').id))
      .innerJoin(user, eq(rate.id_user, user.id))
      .where(and(...filter))
      .limit(1);
    return resultRate;
  }

  /**
   * Updates a rate by its ID.
   *
   * @param keys - The query parameters to identify the rate.
   * @param rateData - The data to update the rate with.
   * @returns A promise that resolves to the updated rate if successful, otherwise null.
   */
  async update(keys: RateQuery, rateData: Partial<Rate>): Promise<RateType | null> {
    const filter = RateQueryBuilder(keys);
    const [updatedRate] = await db
      .update(rate)
      .set(rateData)
      .where(and(...filter))
      .returning();
    const query: RateQuery = {
      id_technician: updatedRate.id_technician,
      id_user: updatedRate.id_user,
      date: updatedRate.date
    };
    return await this.getById(query);
  }

  /**
   * Deletes a rate by its ID.
   *
   * @param keys - The query parameters to identify the rate.
   * @returns A promise that resolves when the rate is deleted.
   */
  async delete(keys: RateQuery): Promise<void> {
    const filter = RateQueryBuilder(keys);
    await db.delete(rate).where(and(...filter));
  }

  /**
   * Retrieves all rates based on the provided filter.
   *
   * @param filter - The query parameters to filter the rates.
   * @param pagination
   * @param orderBy
   * @returns A promise that resolves to an array of rates.
   */
  async getAll(
    filter: RateQuery,
    pagination: Pagination,
    orderBy?: string
  ): Promise<PaginatedResponse<RateType>> {
    const orderParam = RateOrderBy[orderBy as keyof typeof RateOrderBy] ?? rate.date;
    const items = await db
      .select(rateSelection)
      .from(rate)
      .innerJoin(alias(user, 'technician'), eq(rate.id_technician, alias(user, 'technician').id))
      .innerJoin(user, eq(rate.id_user, user.id))
      .where(and(...RateQueryBuilder(filter)))
      .orderBy(desc(orderParam))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(rate)
    };
  }

  /**
   * Creates a new rate.
   *
   * @param newRate - The data for the new rate.
   * @returns A promise that resolves to the created rate if successful, otherwise null.
   */
  async create(newRate: NewRate): Promise<RateType | null> {
    const [createdRate] = await db.insert(rate).values(newRate).returning();
    const query: RateQuery = {
      id_technician: createdRate.id_technician,
      id_user: createdRate.id_user,
      date: createdRate.date
    };
    return await this.getById(query);
  }
}
