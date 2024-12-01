import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { technician } from '../../db/schemas/technician';

export const technicianSchema = z.object({
  id_user: z.string().uuid(),
  exp_years: z.number().int().positive(),
  specialty: z.string()
});

export type TechnicianQuery = {
  id_user?: string;
  exp_years?: number;
  specialty?: string;
}

export function TechnicianQueryBuilder(query: TechnicianQuery) : SQL[] {
  const filters : SQL[] = []
  if (query.id_user) filters.push(eq(technician.id_user, query.id_user));
  if (query.exp_years) filters.push(eq(technician.exp_years, query.exp_years));
  if (query.specialty) filters.push(eq(technician.specialty, query.specialty));
  return filters;
}