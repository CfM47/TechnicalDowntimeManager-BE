import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { role } from '../../db/schemas/role';

export const roleSchema = z.object({
  id: z.number(),
  name : z.string()
});
export type RoleQuery = {
  id?: number;
  name?: string;
}
export function RoleQueryBuilder(query: RoleQuery) : SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(role.id, query.id));
  if (query.name) filters.push(eq(role.name, query.name));
  return filters
}