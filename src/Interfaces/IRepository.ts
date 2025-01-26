/**
 * Generic repository interface for CRUD operations.
 *
 * @template TQuery - The type for query parameters.
 * @template TNew - The type for new entities.
 * @template TInsert - The type for entities to be inserted.
 * @template T - The type for the entity.
 */

export interface IRepository<TQuery, TNew, TInsert, T> {
  /**
   * Creates a new entity.
   *
   * @param {TNew} newRate - The new entity to create.
   * @returns {Promise<T | null>} The created entity or null if creation failed.
   */
  create(newRate: TNew): Promise<T | null>;

  /**
   * Retrieves all entities matching the filter.
   *
   * @param {TQuery} filter - The filter criteria.
   * @returns {Promise<T[]>} A list of matching entities.
   */
  getAll(filter: TQuery): Promise<T[]>;

  /**
   * Retrieves an entity by its identifier.
   *
   * @param {TQuery} keys - The identifier of the entity.
   * @returns {Promise<T | null>} The entity or null if not found.
   */
  getById(keys: TQuery): Promise<T | null>;

  /**
   * Updates an existing entity.
   *
   * @param {TQuery} keys - The identifier of the entity to update.
   * @param {Partial<TInsert>} rateData - The data to update the entity with.
   * @returns {Promise<T | null>} The updated entity or null if update failed.
   */
  update(keys: TQuery, rateData: Partial<TInsert>): Promise<T | null>;

  /**
   * Deletes an entity.
   *
   * @param {TQuery} keys - The identifier of the entity to delete.
   * @returns {Promise<void>} A promise that resolves when the entity is deleted.
   */
  delete(keys: TQuery): Promise<void>;
}
