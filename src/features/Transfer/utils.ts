import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { transfer } from './schema';
import { TransferStatuses } from '../../enums';

const transferStatus = z.enum(TransferStatuses);

/**
 * Enum for transfer statuses.
 */

/**
 * Schema for validating transfer objects.
 */
export const transferSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_receiver_dep: z.string().uuid(),
  status: transferStatus
});

/**
 * Type definition for transfer query parameters.
 */
export type TransferQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_origin_dep?: string;
  id_receiver_dep?: string;
  status?: string;
};

/**
 * Builds an array of SQL filters based on the provided transfer query parameters.
 *
 * @param query - The transfer query parameters.
 * @returns An array of SQL filters.
 */
export function TransferQueryBuilder(query: TransferQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_sender) filters.push(eq(transfer.id_sender, query.id_sender));
  if (query.id_receiver) filters.push(eq(transfer.id_receiver, query.id_receiver));
  if (query.id_equipment) filters.push(eq(transfer.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(transfer.date, query.date));
  if (query.id_origin_dep) filters.push(eq(transfer.id_origin_dep, query.id_origin_dep));
  if (query.id_receiver_dep) filters.push(eq(transfer.id_receiver_dep, query.id_receiver_dep));
  if (query.status) filters.push(eq(transfer.status, query.status));
  return filters;
}
