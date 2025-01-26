import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { rate } from './schema';

/**
 * Zod schema for validating rate objects.
 *
 * This schema validates the structure of a rate object, ensuring that:
 * - `id_technician` is a valid UUID string.
 * - `id_user` is a valid UUID string.
 * - `comment` is a string.
 * - `score` is a number between 1 and 5 (inclusive).
 */
export const rateSchema = z.object({
  id_technician: z.string().uuid(),
  id_user: z.string().uuid(),
  comment: z.string(),
  score: z.number().min(1).max(5)
});

/**
 * Type definition for querying rates.
 *
 * This type defines the possible fields that can be used to filter rate queries:
 * - `id_technician`: Optional UUID string of the technician.
 * - `id_user`: Optional UUID string of the user.
 * - `date`: Optional string representing the date.
 * - `comment`: Optional string containing the comment.
 * - `score`: Optional number representing the score.
 */
export type RateQuery = {
  id_technician?: string;
  id_user?: string;
  date?: string;
  comment?: string;
  score?: number;
};

/**
 * Builds an array of SQL filters based on the provided rate query.
 *
 * This function takes a `RateQuery` object and constructs an array of SQL filters
 * to be used in querying the `rate` table. Each field in the query object is
 * converted to an SQL equality condition if it is defined.
 *
 * @param query - The `RateQuery` object containing the filter criteria.
 * @returns An array of SQL filters to be used in a query.
 */
export function RateQueryBuilder(query: RateQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_user) filters.push(eq(rate.id_user, query.id_user));
  if (query.id_technician) filters.push(eq(rate.id_technician, query.id_technician));
  if (query.comment) filters.push(eq(rate.comment, query.comment));
  if (query.score) filters.push(eq(rate.score, query.score));
  if (query.date) filters.push(eq(rate.date, query.date));
  return filters;
}
