import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { rate } from './schema';

/**
 * rateSchema is a schema definition used for validating rating information.
 * It ensures that the necessary data fields meet specific requirements for structure and value.
 *
 * Properties:
 * - id_technician: A unique identifier for the technician, represented as a valid UUID string.
 * - id_user: A unique identifier for the user providing the rating, represented as a valid UUID string.
 * - comment: A textual comment or feedback associated with the rating.
 * - score: A numerical score rating, constrained to be between 1 and 5 inclusive.
 */
export const rateSchema = z.object({
  id_technician: z.string().uuid(),
  id_user: z.string().uuid(),
  comment: z.string(),
  score: z.number().min(1).max(5)
});

/**
 * Represents a query object for rating-related data.
 *
 * This object is used to store information about a technician's rating,
 * user details, date of feedback, comments, and the associated score.
 *
 * Properties:
 * - id_technician (optional): The unique identifier of the technician being rated.
 * - id_user (optional): The unique identifier of the user providing the rating.
 * - date (optional): The date when the rating was submitted, formatted as a string.
 * - comment (optional): Additional feedback or comments provided by the user.
 * - score (optional): A numerical score representing the rating provided by the user.
 */
export type RateQuery = {
  id_technician?: string;
  id_user?: string;
  date?: string;
  comment?: string;
  score?: number;
};

/**
 * Builds an array of SQL filter conditions based on the provided RateQuery parameters.
 * Each non-null parameter in the RateQuery object adds a corresponding filter condition.
 *
 * @param {RateQuery} query - An object representing filtering criteria for the rate query.
 * It may contain properties such as id_user, id_technician, comment, score, and date.
 * @return {SQL[]} An array of SQL conditions based on the provided query parameters.
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
