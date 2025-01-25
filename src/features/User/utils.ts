import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { user } from './schema';
import { Roles } from '../../enums';

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id_department: z.string().uuid(),
  role: z.enum(Roles),
  token: z.string().optional()
});

export type UserQuery = {
  id?: string;
  name?: string;
  id_department?: string;
  role?: string;
  token?: string;
};
export function UserQueryBuilder(query: UserQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(user.id, query.id));
  if (query.name) filters.push(eq(user.name, query.name));
  if (query.id_department) filters.push(eq(user.id_department, query.id_department));
  if (query.role) filters.push(eq(user.role, query.role));
  return filters;
}
