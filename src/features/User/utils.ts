import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { user } from './schema';
import { Roles } from '../../enums';

/**
 * Schema definition for a user object.
 *
 * This schema defines the structure and validation rules
 * for user-related data within the application.
 *
 * Properties:
 * - name: Represents the name of the user. It is a required string.
 * - password: Represents the user's password. It is a required string.
 * - id_department: A unique identifier for the user's associated department.
 *   It is required and must be a valid UUID string.
 * - role: The role assigned to the user. It must be an enumerated value
 *   within the predefined roles.
 * - token: An optional string representing the user's authentication token.
 * - isTechnician: A boolean indicating whether the user holds a technician role.
 *   It is required.
 * - exp_years: Represents the user's experience in years. It is an optional
 *   integer that must be positive.
 * - specialty: Represents the user's area of expertise. It is an optional string.
 */
export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id_department: z.string().uuid(),
  role: z.enum(Roles),
  token: z.string().optional(),
  isTechnician: z.boolean(),
  exp_years: z.number().int().positive().optional(),
  specialty: z.string().optional()
});

/**
 * Represents a query object for filtering user data.
 *
 * This type is used to define the parameters that can be utilized to filter or search for users
 * within a system. Each property is optional and provides different criteria for narrowing
 * down user datasets.
 *
 * Properties:
 * - `id`: (Optional) The unique identifier of the user.
 * - `name`: (Optional) The name of the user.
 * - `id_department`: (Optional) The identifier of the department the user belongs to.
 * - `role`: (Optional) The role of the user in the system.
 * - `token`: (Optional) A token associated with the user, which might be used for authentication or session tracking.
 */
export type UserQuery = {
  id?: string;
  name?: string;
  id_department?: string;
  role?: string;
  token?: string;
};

/**
 * Builds an array of SQL filters based on the properties of the provided user query object.
 *
 * @param {UserQuery} query - The user query object containing filter criteria.
 * @return {SQL[]} An array of SQL filters generated from the query's properties.
 */
export function UserQueryBuilder(query: UserQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(user.id, query.id));
  if (query.name) filters.push(eq(user.name, query.name));
  if (query.id_department) filters.push(eq(user.id_department, query.id_department));
  if (query.role) filters.push(eq(user.role, query.role));
  return filters;
}
