import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { downtime } from './schema';
import { DowntimeStatuses } from '../../enums';
import { DowntimeLastYearTypeTable, DowntimeType } from './types';

const downtimeStatus = z.enum(DowntimeStatuses);

export const downtimeSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_dep_receiver: z.string().uuid(),
  status: downtimeStatus,
  cause: z.string()
});
/**
 * Type for querying downtime records.
 */
export type DowntimeQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_dep_receiver?: string;
  status?: string;
  cause?: string;
};

/**
 * Builds an array of SQL filters based on the provided downtime query.
 *
 * @param query - The query object containing downtime filter criteria.
 * @returns An array of SQL filter conditions.
 */
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

/**
 * Maps a DowntimeType object to a DowntimeLastYearType object.
 *
 * @param downtime - The DowntimeType object to map.
 * @returns The mapped DowntimeLastYearType object.
 */
export function mapToLastYearTypeTable(downtime: DowntimeType): DowntimeLastYearTypeTable {
  return {
    Sender: downtime.sender.name,
    Receiver: downtime.receiver.name,
    Equipment: downtime.equipment.name,
    Destiny: downtime.dep_receiver.name
  };
}
