import { PaginatedResponse, Pagination } from '../utils';

/**
 * IRepository interface defines a generic contract for CRUD operations on a data repository.
 *
 * @template TQuery - The type defining the query/filter parameters used for fetching records.
 * @template TNew - The type representing the structure of the data for creating a new record.
 * @template TInsert - The type for partial or complete updates to an existing record.
 * @template T - The type of the resulting record returned from repository operations.
 */

export interface IRepository<TQuery, TNew, TInsert, T> {
  create(newRate: TNew): Promise<T | null>;

  getAll(filter: TQuery, pagination: Pagination, orderBy?: string): Promise<PaginatedResponse<T>>;

  getById(keys: TQuery): Promise<T | null>;

  update(keys: TQuery, rateData: Partial<TInsert>): Promise<T | null>;

  delete(keys: TQuery): Promise<void>;
}
