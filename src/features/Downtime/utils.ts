import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { downtime } from './schema';
import { DowntimeStatuses } from '../../enums';

const downtimeStatus = z.enum(DowntimeStatuses);

export const downtimeSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_dep_receiver: z.string().uuid(),
  status: downtimeStatus,
  cause: z.string()
});

export type DowntimeQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_dep_receiver?: string;
  status?: string;
  cause?: string;
};

export function DowntimeQueryBuilder(query: DowntimeQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_sender) filters.push(eq(downtime.id_sender, query.id_sender));
  if (query.id_receiver) filters.push(eq(downtime.id_receiver, query.id_receiver));
  if (query.id_equipment) filters.push(eq(downtime.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(downtime.date, query.date));
  if (query.id_dep_receiver) filters.push(eq(downtime.id_dep_receiver, query.id_dep_receiver));
  if (query.status) filters.push(eq(downtime.status, query.status));
  if (query.cause) filters.push(eq(downtime.cause, query.cause));
  return filters;
}
