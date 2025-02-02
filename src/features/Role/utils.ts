import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { role } from './schema';

export const roleSchema = z.object({
  name: z.string()
});
export type RoleQuery = {
  id?: number;
  name?: string;
};
export function RoleQueryBuilder(query: RoleQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(role.id, query.id));
  if (query.name) filters.push(eq(role.name, query.name));
  return filters;
}
