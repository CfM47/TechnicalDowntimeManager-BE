import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { department } from './schema';

export const departmentSchema = z.object({
  name: z.string()
});

export type DepartmentQuery = {
  id?: string;
  name?: string;
};

export function DepartmentQueryBuilder(query: DepartmentQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(department.id, query.id));
  if (query.name) filters.push(eq(department.name, query.name));
  return filters;
}
