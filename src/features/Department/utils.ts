import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { department } from './schema';

/**
 * Represents the schema definition for a department entity.
 *
 * This schema uses `zod` to validate the structure of a department object.
 * It ensures that the department object contains the required fields and adheres
 * to the specified types.
 */
export const departmentSchema = z.object({
  name: z.string()
});

/**
 * Represents a query object for fetching or filtering departments. It allows specifying
 * optional parameters to narrow down the search results.
 *
 * @typedef {Object} DepartmentQuery
 * @property {string} [id] - The unique identifier of the department.
 * @property {string} [name] - The name of the department.
 */
export type DepartmentQuery = {
  id?: string;
  name?: string;
};

/**
 * Constructs an array of SQL filter conditions based on the specified department query.
 *
 * @param {DepartmentQuery} query - The query object containing department filter criteria such as `id` and `name`.
 * @return {SQL[]} An array of SQL filter conditions derived from the query.
 */
export function DepartmentQueryBuilder(query: DepartmentQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(department.id, query.id));
  if (query.name) filters.push(eq(department.name, query.name));
  return filters;
}
