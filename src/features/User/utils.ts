import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { user } from '../../db/schemas/user';

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id_department: z.string().uuid(),
  id_role: z.number().int().positive()
});

export type UserQuery = {
  id?: string;
  name?: string;
  id_department?: string;
  id_role?: number;
}
export function UserQueryBuilder<T extends object>(query: UserQuery) : SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(user.id, query.id));
  if (query.name) filters.push(eq(user.name, query.name));
  if (query.id_department) filters.push(eq(user.id_department, query.id_department));
  if (query.id_role) filters.push(eq(user.id_role, query.id_role));
  return filters
}


