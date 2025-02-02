import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { user } from './schema';

/**
 * Zod schema for validating user data.
 *
 * Fields:
 * - `name`: The name of the user (string).
 * - `password`: The password of the user (string).
 * - `id_department`: The UUID of the department the user belongs to (string).
 * - `role`: The role of the user (enum).
 * - `token`: An optional token for the user (string).
 */
export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id_department: z.string().uuid(),
  id_role: z.number().int().positive(),
  token: z.string().optional(),
  isTechnician: z.boolean(),
  exp_years: z.number().int().positive().optional(),
  specialty: z.string().optional()
});

/**
 * Type representing the query parameters for filtering users.
 *
 * Fields:
 * - `id`: The ID of the user (optional string).
 * - `name`: The name of the user (optional string).
 * - `id_department`: The ID of the department the user belongs to (optional string).
 * - `role`: The role of the user (optional string).
 * - `token`: The token of the user (optional string).
 */
export type UserQuery = {
  id?: string;
  name?: string;
  id_department?: string;
  id_role?: number;
  token?: string;
};

/**
 * Builds an array of SQL filters based on the provided user query parameters.
 *
 * @param {UserQuery} query - The query parameters for filtering users.
 * @returns {SQL[]} An array of SQL filters.
 */
export function UserQueryBuilder(query: UserQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(user.id, query.id));
  if (query.name) filters.push(eq(user.name, query.name));
  if (query.id_department) filters.push(eq(user.id_department, query.id_department));
  if (query.id_role) filters.push(eq(user.id_role, query.id_role));
  return filters;
}
