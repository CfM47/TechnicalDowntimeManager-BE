import z from "zod";
import {eq, SQL} from "drizzle-orm";
import {transfer} from "../../db/schemas/transfer";

export const transferSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_origin_dep: z.string().uuid(),
  id_receiver_dep: z.string().uuid(),
  downtime_status: z.string()
});

export type TransferQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_origin_dep?: string;
  id_receiver_dep?: string;
  downtime_status?: string;
}

export function TransferQueryBuilder(query: TransferQuery) : SQL[] {
  const filters: SQL[] = [];
  if (query.id_sender) filters.push(eq(transfer.id_sender, query.id_sender));
  if (query.id_receiver) filters.push(eq(transfer.id_receiver, query.id_receiver));
  if (query.id_equipment) filters.push(eq(transfer.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(transfer.date, query.date));
  if (query.id_origin_dep) filters.push(eq(transfer.id_origin_dep, query.id_origin_dep));
  if (query.id_receiver_dep) filters.push(eq(transfer.id_receiver_dep, query.id_receiver_dep));
  if (query.downtime_status) filters.push(eq(transfer.downtime_status, query.downtime_status));
  return filters;
}