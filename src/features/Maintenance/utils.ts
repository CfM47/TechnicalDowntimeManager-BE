import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { maintenance } from './schema';
import { MaintenanceTypes } from '../../enums';
import { EquipmentMaintenanceHistoryTypeTable, MaintenanceType } from './types';

const maintenanceType = z.enum(MaintenanceTypes);

/**
 * Zod schema for validating maintenance records.
 *
 * This schema validates the structure of a maintenance record, ensuring that
 * the technician ID and equipment ID are valid UUIDs, the type is a valid
 * maintenance type, and the cost is a positive number.
 */
export const maintenanceSchema = z.object({
  id_technician: z.string().uuid(),
  id_equipment: z.string().uuid(),
  type: maintenanceType,
  cost: z.number().positive()
});

/**
 * Type representing a query for maintenance records.
 *
 * This type defines the possible fields that can be used to query maintenance
 * records, including technician ID, equipment ID, date, type, and cost.
 */
export type MaintenanceQuery = {
  id_technician?: string;
  id_equipment?: string;
  date?: string;
  type?: string;
  cost?: number;
};

/**
 * Builds an array of SQL filters based on the provided maintenance query.
 *
 * This function takes a `MaintenanceQuery` object and constructs an array of
 * SQL filters to be used in querying the `maintenance` table. Each field in
 * the query object is converted to an SQL equality condition if it is defined.
 *
 * @param query - The query object containing the fields to filter by.
 * @returns An array of SQL filters based on the query object.
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

export function mapToEquipmentMaintenanceHistoryTypeTable(
  maintenance: MaintenanceType
): EquipmentMaintenanceHistoryTypeTable {
  return {
    Technician: maintenance.technician.name,
    Type: maintenance.type,
    Date: maintenance.date
  };
}
