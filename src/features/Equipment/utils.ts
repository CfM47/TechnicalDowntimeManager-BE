import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { equipment } from './schema';
import { EquipmentStatuses, EquipmentTypes } from '../../enums';
import { DefectiveEquipmentTypeTable, EquipmentWithMaintenances } from './types';

/**
 * Represents the state of equipment, constrained to a predefined set of statuses.
 *
 * The variable `equipmentState` is defined using a `z.enum`, ensuring that it only accepts
 * values from the `EquipmentStatuses` enumeration. This provides strict validation and ensures
 * that the equipment state is always within the allowed statuses.
 *
 * Common use cases include tracking operational status, maintenance requirements, or other
 * state-specific behavior of an equipment.
 *
 * @type {z.ZodEnum<typeof EquipmentStatuses>}
 */
const equipmentState = z.enum(EquipmentStatuses);
/**
 * Represents the type of equipment, constrained to a specific set of valid types defined by `EquipmentTypes`.
 * This variable is declared as a Zod enum schema and validates the assigned value against the predefined set.
 */
const equipmentType = z.enum(EquipmentTypes);

/**
 * Schema definition for equipment data.
 *
 * The `equipmentSchema` object defines the structure and validation rules for equipment-related information.
 *
 * Properties:
 * - `name`: A required string field that specifies the name of the equipment, limited to a maximum of 255 characters.
 * - `type`: Custom property representing the category or type of the equipment, based on the predefined `equipmentType`.
 * - `status`: Custom property representing the operational status of the equipment, adhering to the predefined `equipmentState`.
 * - `id_department`: A required UUID string that identifies the department associated with the equipment.
 */
export const equipmentSchema = z.object({
  name: z.string().max(255),
  type: equipmentType,
  status: equipmentState,
  id_department: z.string().uuid()
});
/**
 * A type representing a query for filtering equipment records.
 *
 * This type defines the possible fields that can be used to filter equipment information
 * when querying a data source. Each field is optional, allowing selective querying based on
 * specified criteria.
 *
 * @typedef {Object} EquipmentQuery
 * @property {string} [id] - The unique identifier of the equipment.
 * @property {string} [name] - The name of the equipment.
 * @property {string} [type] - The type or category of the equipment.
 * @property {string} [status] - The current status of the equipment (e.g., active, inactive, maintenance).
 * @property {string} [id_department] - The identifier of the department to which the equipment belongs.
 * @property {string} [acquisition_date] - The date the equipment was acquired, typically formatted as a string.
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
 * Builds a list of SQL filter conditions based on the provided equipment query.
 *
 * @param {EquipmentQuery} query - The query object containing filter parameters for equipment.
 * @return {SQL[]} A list of SQL filter conditions based on the query parameters.
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

/**
 * Converts equipment data with maintenance information into a format compatible with the defective equipment type table.
 *
 * @param {EquipmentWithMaintenances} equipment - The equipment object containing details about the equipment and its maintenances.
 * @return {DefectiveEquipmentTypeTable} An object containing the mapped data for the defective equipment type table.
 */
export function mapToDefectiveEquipmentTypeTable(
  equipment: EquipmentWithMaintenances
): DefectiveEquipmentTypeTable {
  return {
    Name: equipment.name,
    Type: equipment.type,
    Status: equipment.status,
    Department: equipment.department.name,
    Total_Maintenances: equipment.totalMaintenances
  };
}
