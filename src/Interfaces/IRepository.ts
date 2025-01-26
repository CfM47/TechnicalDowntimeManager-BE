/**
 * Generic repository interface for CRUD operations.
 *
 * @template TQuery - The type for query parameters.
 * @template TNew - The type for new entities.
 * @template TInsert - The type for entities to be inserted.
 * @template T - The type for the entity.
 */

import { Pagination } from '../utils';

export interface IRepository<TQuery, TNew, TInsert, T> {
  create(newRate: TNew): Promise<T | null>;

  getAll(filter: TQuery, pagination: Pagination): Promise<T[]>;

  getById(keys: TQuery): Promise<T | null>;

  update(keys: TQuery, rateData: Partial<TInsert>): Promise<T | null>;

  delete(keys: TQuery): Promise<void>;
}
