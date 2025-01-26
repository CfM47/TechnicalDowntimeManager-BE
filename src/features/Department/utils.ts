import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { department } from './schema';

/**
 * Zod schema for validating a department object.
 *
 * The schema includes the following fields:
 * - `name`: A string that represents the name of the department.
 */
export const departmentSchema = z.object({
  name: z.string()
});

/**
 * Represents the query parameters for filtering departments.
 */
export type DepartmentQuery = {
  id?: string;
  name?: string;
};

/**
 * Builds an array of SQL filters based on the provided query parameters.
 *
 * @param query - The query parameters for filtering departments.
 * @returns An array of SQL filters.
 */
export function DepartmentQueryBuilder(query: DepartmentQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(department.id, query.id));
  if (query.name) filters.push(eq(department.name, query.name));
  return filters;
}
