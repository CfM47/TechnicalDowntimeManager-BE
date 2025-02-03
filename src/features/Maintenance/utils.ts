import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { maintenance } from './schema';
import { MaintenanceTypes } from '../../enums';
import { EquipmentMaintenanceHistoryTypeTable, MaintenanceType } from './types';

/**
 * Represents the type of maintenance for a specific entity or process.
 * This variable is defined using a zod enumeration (z.enum) of predefined
 * maintenance types, which are grouped under the `MaintenanceTypes` definition.
 * It ensures that the value assigned to `maintenanceType` strictly adheres
 * to one of these predefined types.
 */
const maintenanceType = z.enum(MaintenanceTypes);

/**
 * Represents the schema for the maintenance data structure.
 *
 * This schema defines the properties required for a maintenance record and enforces validation rules
 * to ensure data integrity.
 *
 * Properties:
 * - `id_technician`: A string representing the unique identifier of the technician performing the maintenance. Must be a valid UUID.
 * - `id_equipment`: A string representing the unique identifier of the equipment being maintained. Must be a valid UUID.
 * - `type`: The type of maintenance being performed. This is validated against the predefined values in the `maintenanceType`.
 * - `cost`: A positive number representing the cost associated with the maintenance task.
 */
export const maintenanceSchema = z.object({
  id_technician: z.string().uuid(),
  id_equipment: z.string().uuid(),
  type: maintenanceType,
  cost: z.number().positive()
});

/**
 * Represents a maintenance query used to filter maintenance records.
 *
 * @typedef {Object} MaintenanceQuery
 * @property {string} [id_technician] - The unique identifier of a technician.
 * @property {string} [id_equipment] - The unique identifier of an equipment.
 * @property {string} [date] - The date on which the maintenance was performed, formatted as a string.
 * @property {string} [type] - The type or nature of the maintenance performed.
 * @property {number} [cost] - The cost associated with the maintenance.
 */
export type MaintenanceQuery = {
  id_technician?: string;
  id_equipment?: string;
  date?: string;
  type?: string;
  cost?: number;
};

/**
 * Builds an array of SQL filters based on the provided MaintenanceQuery object.
 *
 * @param {MaintenanceQuery} query - An object containing maintenance query parameters such as technician ID, equipment ID, date, type, and cost.
 * @return {SQL[]} An array of SQL filter conditions derived from the given query parameters.
 */
export function MaintenanceQueryBuilder(query: MaintenanceQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_technician) filters.push(eq(maintenance.id_technician, query.id_technician));
  if (query.id_equipment) filters.push(eq(maintenance.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(maintenance.date, query.date));
  if (query.type) filters.push(eq(maintenance.type, query.type));
  if (query.cost) filters.push(eq(maintenance.cost, query.cost));
  return filters;
}

/**
 * Maps a MaintenanceType object to an EquipmentMaintenanceHistoryTypeTable object.
 *
 * @param {MaintenanceType} maintenance - The maintenance object containing details such as technician, type, and date.
 * @return {EquipmentMaintenanceHistoryTypeTable} A table object containing mapped maintenance history details.
 */
export function mapToEquipmentMaintenanceHistoryTypeTable(
  maintenance: MaintenanceType
): EquipmentMaintenanceHistoryTypeTable {
  return {
    Technician: maintenance.technician.name,
    Type: maintenance.type,
    Date: maintenance.date
  };
}
