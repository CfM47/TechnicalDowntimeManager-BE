import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { equipment } from './schema';

export const equipmentSchema = z.object({
  name: z.string().max(255),
  type: z.string().max(255),
  state: z.string().max(255),
  id_department: z.string().uuid()
});

export type EquipmentQuery = {
  id?: string;
  name?: string;
  type?: string;
  state?: string;
  id_department?: string;
  acquisition_date?: string;
};

export function EquipmentQueryBuilder(query: EquipmentQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(equipment.id, query.id));
  if (query.name) filters.push(eq(equipment.name, query.name));
  if (query.type) filters.push(eq(equipment.type, query.type));
  if (query.state) filters.push(eq(equipment, query.state));
  if (query.id_department) filters.push(eq(equipment.id_department, query.id_department));
  if (query.acquisition_date) filters.push(eq(equipment.acquisition_date, query.acquisition_date));
  return filters;
}
