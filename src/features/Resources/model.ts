import { and } from 'drizzle-orm';
import { db } from '../../db/config/db_connect';
import { IResourceModel } from '../../Interfaces/IResourceModel';
import { Pagination, PaginatedResponse, countTableRows } from '../../utils';
import { NewResource, resource } from './schema';
import { ResourceType } from './types';
import { ResourceQuery, ResourceQueryBuilder } from './utils';

export class ResourceModel implements IResourceModel {
  async create(newResource: NewResource): Promise<ResourceType> {
    const [createdResource] = await db.insert(resource).values(newResource).returning();
    return createdResource;
  }
  async delete(keys: ResourceQuery): Promise<void> {
    const filter = ResourceQueryBuilder(keys);
    await db.delete(resource).where(and(...filter));
  }
  async getAll(
    filter: ResourceQuery,
    pagination: Pagination
  ): Promise<PaginatedResponse<ResourceType>> {
    const filterQuery = ResourceQueryBuilder(filter);
    const items = await db
      .select()
      .from(resource)
      .where(and(...filterQuery))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(resource, filterQuery)
    };
  }
  async getById(keys: ResourceQuery): Promise<ResourceType> {
    const filter = ResourceQueryBuilder(keys);
    const [resultResource] = await db
      .select()
      .from(resource)
      .where(and(...filter))
      .limit(1);
    return resultResource;
  }

  async update(keys: ResourceQuery, newResource: NewResource): Promise<ResourceType> {
    const filter = ResourceQueryBuilder(keys);
    const [updatedResource] = await db
      .update(resource)
      .set(newResource)
      .where(and(...filter))
      .returning();
    return updatedResource;
  }
}
