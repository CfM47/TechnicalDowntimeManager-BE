import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { maintenance } from './schema';
import { MaintenanceTypes } from '../../enums';

const maintenanceType = z.enum(MaintenanceTypes);

export const maintenanceSchema = z.object({
  id_technician: z.string().uuid(),
  id_equipment: z.string().uuid(),
  type: maintenanceType,
  cost: z.number().positive()
});

export type MaintenanceQuery = {
  id_technician?: string;
  id_equipment?: string;
  date?: string;
  type?: string;
  cost?: number;
};

export function MaintenanceQueryBuilder(query: MaintenanceQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_technician) filters.push(eq(maintenance.id_technician, query.id_technician));
  if (query.id_equipment) filters.push(eq(maintenance.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(maintenance.date, query.date));
  if (query.type) filters.push(eq(maintenance.type, query.type));
  if (query.cost) filters.push(eq(maintenance.cost, query.cost));
  return filters;
}
