import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { equipment } from './schema';
import { EquipmentStatuses, EquipmentTypes } from '../../enums';

/**
 * Zod schema for validating equipment state and type.
 */
const equipmentState = z.enum(EquipmentStatuses);
const equipmentType = z.enum(EquipmentTypes);

/**
 * Zod schema for validating equipment data.
 */
export const equipmentSchema = z.object({
  name: z.string().max(255),
  type: equipmentType,
  status: equipmentState,
  id_department: z.string().uuid()
});
/**
 * Type representing a query object for filtering equipment records.
 *
 * This type defines the possible properties that can be used to filter
 * equipment records in the database. Each property is optional and corresponds
 * to a column in the `equipment` table.
 */
export type EquipmentQuery = {
  id?: string;
  name?: string;
  type?: string;
  status?: string;
  id_department?: string;
  acquisition_date?: string;
};

/**
 * Builds an array of SQL filters based on the provided equipment query.
 *
 * This function takes an `EquipmentQuery` object and constructs an array of SQL filter conditions
 * that can be used to query the `equipment` table. Each property in the query object corresponds
 * to a column in the `equipment` table, and if a property is defined, a filter condition is added
 * to the array.
 *
 * @param query - The query object containing filter criteria for the equipment.
 * @returns An array of SQL filter conditions to be used in a database query.
 */
export function EquipmentQueryBuilder(query: EquipmentQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(equipment.id, query.id));
  if (query.name) filters.push(eq(equipment.name, query.name));
  if (query.type) filters.push(eq(equipment.type, query.type));
  if (query.status) filters.push(eq(equipment.status, query.status));
  if (query.id_department) filters.push(eq(equipment.id_department, query.id_department));
  if (query.acquisition_date) filters.push(eq(equipment.acquisition_date, query.acquisition_date));
  return filters;
}
