import { roleResource, RoleResource, NewRoleResource } from './schema';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { RoleResourceQuery, RoleResourceQueryBuilder } from './utils';
import { roleResourceSelection, RoleResourceType } from './types';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';
import { role } from '../Role/schema';
import { resource } from '../Resources/schema';

/**
 * Model class for handling CRUD operations on RoleResource entities.
 *
 * This class provides methods to create, retrieve, update, and delete role resources.
 * Each method interacts with the database to perform the necessary operations.
 */
export class RoleResourceModel implements IRoleResourceModel {
  /**
   * Retrieves a role resource by its ID.
   *
   * @param keys - The query parameters to identify the role resource.
   * @returns A promise that resolves to the role resource if found, otherwise null.
   */
  async getById(keys: RoleResourceQuery): Promise<RoleResourceType | null> {
    const filter = RoleResourceQueryBuilder(keys);
    const [resultRoleResource] = await db
      .select(roleResourceSelection)
      .from(roleResource)
      .innerJoin(role, eq(roleResource.role_id, role.id))
      .innerJoin(resource, eq(roleResource.resource_id, resource.id))
      .where(and(...filter))
      .limit(1);
    return resultRoleResource;
  }

  /**
   * Updates a role resource by its ID.
   *
   * @param keys - The query parameters to identify the role resource.
   * @param roleResourceData - The data to update the role resource with.
   * @returns A promise that resolves to the updated role resource if successful, otherwise null.
   */
  async update(
    keys: RoleResourceQuery,
    roleResourceData: Partial<RoleResource>
  ): Promise<RoleResourceType | null> {
    const filter = RoleResourceQueryBuilder(keys);
    const [updatedRoleResource] = await db
      .update(roleResource)
      .set(roleResourceData)
      .where(and(...filter))
      .returning();
    const query: RoleResourceQuery = {
      role_id: updatedRoleResource.role_id,
      resource_id: updatedRoleResource.resource_id
    };
    return await this.getById(query);
  }

  /**
   * Deletes a role resource by its ID.
   *
   * @param keys - The query parameters to identify the role resource.
   * @returns A promise that resolves when the role resource is deleted.
   */
  async delete(keys: RoleResourceQuery): Promise<void> {
    const filter = RoleResourceQueryBuilder(keys);
    await db.delete(roleResource).where(and(...filter));
  }

  /**
   * Retrieves all role resources based on the provided filter.
   *
   * @param filter - The query parameters to filter the role resources.
   * @param pagination
   * @param orderBy
   * @returns A promise that resolves to an array of role resources.
   */
  async getAll(
    filter: RoleResourceQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<RoleResourceType>> {
    const filterQuery = RoleResourceQueryBuilder(filter);
    const items = await db
      .select(roleResourceSelection)
      .from(roleResource)
      .innerJoin(role, eq(roleResource.role_id, roleResource.role_id))
      .innerJoin(resource, eq(roleResource.resource_id, roleResource.resource_id))
      .where(and(...filterQuery))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(roleResource, filterQuery)
    };
  }

  /**
   * Creates a new role resource.
   *
   * @param newRoleResource - The data for the new role resource.
   * @returns A promise that resolves to the created role resource if successful, otherwise null.
   */
  async create(newRoleResource: NewRoleResource): Promise<RoleResourceType | null> {
    const [createdRoleResource] = await db.insert(roleResource).values(newRoleResource).returning();
    const query: RoleResourceQuery = {
      role_id: createdRoleResource.role_id,
      resource_id: createdRoleResource.resource_id
    };
    return await this.getById(query);
  }
}
