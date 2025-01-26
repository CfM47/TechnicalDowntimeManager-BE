import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { technician } from './schema';

/**
 * Zod schema for validating Technician objects.
 *
 * The schema includes the following fields:
 * - `id_user`: A UUID string representing the user ID.
 * - `exp_years`: An integer representing the years of experience, must be positive.
 * - `specialty`: A string representing the technician's specialty.
 */
export const technicianSchema = z.object({
  id_user: z.string().uuid(),
  exp_years: z.number().int().positive(),
  specialty: z.string()
});

/**
 * Type representing a query for Technician records.
 *
 * Fields:
 * - `id_user`: Optional string representing the user ID.
 * - `exp_years`: Optional number representing the years of experience.
 * - `specialty`: Optional string representing the technician's specialty.
 */
export type TechnicianQuery = {
  id_user?: string;
  exp_years?: number;
  specialty?: string;
};

/**
 * Builds an array of SQL filters based on the provided TechnicianQuery.
 *
 * @param query - The TechnicianQuery object containing filter criteria.
 * @returns An array of SQL filter conditions.
 */
export function TechnicianQueryBuilder(query: TechnicianQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_user) filters.push(eq(technician.id_user, query.id_user));
  if (query.exp_years) filters.push(eq(technician.exp_years, query.exp_years));
  if (query.specialty) filters.push(eq(technician.specialty, query.specialty));
  return filters;
}
