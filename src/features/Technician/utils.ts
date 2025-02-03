import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { technician } from './schema';
import {
  TechnicianInterventionType,
  TechnicianInterventionTypeTable,
  TechnicianPerformanceType,
  TechnicianPerformanceTypeTable
} from './types';

/**
 * Represents the schema for a technician entity.
 *
 * This schema is used to validate the structure of a technician object.
 * It defines the required fields and their respective data types. The object includes:
 * - `id_user`: A UUID string that uniquely identifies the technician.
 * - `exp_years`: A positive integer representing the number of years of experience.
 * - `specialty`: A string indicating the area of specialty of the technician.
 *
 * This schema ensures the technician data adheres to the required structure and validations.
 */
export const technicianSchema = z.object({
  id_user: z.string().uuid(),
  exp_years: z.number().int().positive(),
  specialty: z.string()
});

/**
 * Represents a query object for filtering technicians based on specific attributes.
 *
 * @typedef {Object} TechnicianQuery
 * @property {string} [id_user] - The unique identifier of the technician.
 * @property {number} [exp_years] - The number of years of experience the technician has.
 * @property {string} [specialty] - The specialty field of the technician.
 */
export type TechnicianQuery = {
  id_user?: string;
  exp_years?: number;
  specialty?: string;
};

/**
 * Builds an array of SQL filter conditions for querying technicians based on the provided query criteria.
 *
 * @param {TechnicianQuery} query - An object containing the query parameters to filter technician records.
 *                                   It may include the following properties:
 *                                   - id_user: The user ID of the technician.
 *                                   - exp_years: The number of years of experience the technician has.
 *                                   - specialty: The specialty field of the technician.
 * @return {SQL[]} An array of SQL filter conditions derived from the provided query parameters.
 */
export function TechnicianQueryBuilder(query: TechnicianQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_user) filters.push(eq(technician.id_user, query.id_user));
  if (query.exp_years) filters.push(eq(technician.exp_years, query.exp_years));
  if (query.specialty) filters.push(eq(technician.specialty, query.specialty));
  return filters;
}

/**
 * Maps a TechnicianPerformanceType object to a TechnicianPerformanceTypeTable object.
 *
 * @param {TechnicianPerformanceType} technician - The technician performance data to be mapped.
 * @return {TechnicianPerformanceTypeTable} The mapped technician performance type table data.
 */
export function mapToPerformanceTypeTable(
  technician: TechnicianPerformanceType
): TechnicianPerformanceTypeTable {
  return {
    Name: technician.name,
    Score_Avg: technician.score_avg,
    Total_Rates: technician.total_rates,
    Total_Maintenances: technician.total_maintenances
  };
}

/**
 * Maps a TechnicianInterventionType object to a TechnicianInterventionTypeTable object.
 *
 * @param {TechnicianInterventionType} intervention - The intervention object containing data to be mapped.
 * @return {TechnicianInterventionTypeTable} The mapped TechnicianInterventionTypeTable object.
 */
export function mapToInterventionTypeTable(
  intervention: TechnicianInterventionType
): TechnicianInterventionTypeTable {
  return {
    Date: intervention.date,
    Type: intervention.type,
    Additional_Info: intervention.aditional_info
  };
}
