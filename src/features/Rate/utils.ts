import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { rate } from './schema';

export const rateSchema = z.object({
  id_technician: z.string().uuid(),
  id_user: z.string().uuid(),
  comment: z.string(),
  score: z.number().min(1).max(5)
});

export type RateQuery = {
  id_technician?: string;
  id_user?: string;
  date?: string;
  comment?: string;
  score?: number;
};
export function RateQueryBuilder(query: RateQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_user) filters.push(eq(rate.id_user, query.id_user));
  if (query.id_technician) filters.push(eq(rate.id_technician, query.id_technician));
  if (query.comment) filters.push(eq(rate.comment, query.comment));
  if (query.score) filters.push(eq(rate.score, query.score));
  if (query.date) filters.push(eq(rate.date, query.date));
  return filters;
}
