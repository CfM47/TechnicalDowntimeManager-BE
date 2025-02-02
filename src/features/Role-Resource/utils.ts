import { eq, SQL } from 'drizzle-orm';
import { z } from 'zod';
import { roleResource } from './schema';

export const roleResourceSchema = z.object({
  role_id: z.string().uuid(),
  resource_id: z.string().uuid()
});

export type RoleResourceQuery = {
  role_id?: number;
  resource_id?: string;
};

export function RoleResourceQueryBuilder(query: RoleResourceQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.role_id) filters.push(eq(roleResource.role_id, query.role_id));
  if (query.resource_id) filters.push(eq(roleResource.resource_id, query.resource_id));
  return filters;
}
