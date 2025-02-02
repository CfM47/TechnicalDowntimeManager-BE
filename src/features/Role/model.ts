import { IRoleModel } from '../../Interfaces/IRoleModel';
import { db } from '../../db/config/db_connect';
import { and, desc } from 'drizzle-orm';
import { NewRole, Role, role } from './schema';
import { RoleQuery, RoleQueryBuilder } from './utils';
import { RoleOrderBy, roleSelection, RoleType } from './types';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

export class RoleModel implements IRoleModel {
  async create(newRole: NewRole): Promise<RoleType | null> {
    const [createdRole] = await db.insert(role).values(newRole).returning();
    return createdRole;
  }
  async delete(keys: RoleQuery): Promise<void> {
    const filter = RoleQueryBuilder(keys);
    await db.delete(role).where(and(...filter));
  }

  async getAll(
    filter: RoleQuery,
    pagination: Pagination,
    orderBy?: string
  ): Promise<PaginatedResponse<RoleType>> {
    const orderParam = RoleOrderBy[orderBy as keyof typeof RoleOrderBy] ?? role.name;
    const filterQuery = RoleQueryBuilder(filter);
    const items = await db
      .select(roleSelection)
      .from(role)
      .where(and(...filterQuery))
      .orderBy(desc(orderParam))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));

    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(role, filterQuery)
    };
  }

  async getById(keys: RoleQuery): Promise<RoleType | null> {
    const filter = RoleQueryBuilder(keys);
    const [resultRole] = await db
      .select(roleSelection)
      .from(role)
      .where(and(...filter))
      .limit(1);
    return resultRole;
  }

  async update(keys: RoleQuery, technicianData: Partial<Role>): Promise<RoleType | null> {
    const filter = RoleQueryBuilder(keys);
    const [updatedRole] = await db
      .update(role)
      .set(technicianData)
      .where(and(...filter))
      .returning();
    return updatedRole;
  }
}
