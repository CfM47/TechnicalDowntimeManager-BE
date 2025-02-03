import { UserType } from '../User/types';
import { technician } from './schema';
import { user } from '../User/schema';
import { department } from '../Department/schema';
import { avg, countDistinct } from 'drizzle-orm/sql/functions/aggregate';
import { rate } from '../Rate/schema';
import { maintenance } from '../Maintenance/schema';
import { sql } from 'drizzle-orm';
import { downtime } from '../Downtime/schema';

/**
 * Interface representing a Technician type.
 * Extends the UserType interface to include specific properties related to a technician.
 *
 * Properties:
 * - `exp_years`: Number of years of experience the technician has.
 * - `specialty`: The area of expertise or specialization of the technician.
 */
export interface TechnicianType extends UserType {
  exp_years: number;
  specialty: string;
}

/**
 * TechnicianPerformanceType interface represents the performance data of a technician.
 *
 * Properties:
 * - `id`: A unique identifier for the technician.
 * - `name`: The name of the technician.
 * - `score_avg`: The average performance score of the technician.
 * - `total_rates`: The total number of ratings received by the technician.
 * - `total_maintenances`: The total number of maintenance tasks completed by the technician.
 */
export interface TechnicianPerformanceType {
  id: string;
  name: string;
  score_avg: number;
  total_rates: number;
  total_maintenances: number;
}

/**
 * Represents the performance data of a technician with key metrics.
 *
 * @typedef {Object} TechnicianPerformanceSelection
 * @property {number} id - The unique identifier of the technician, derived from `technician.id_user`.
 * @property {string} name - The name of the technician, obtained from `user.name`.
 * @property {number} score_avg - The average score of the technician, rounded to one decimal place. If no score is available, defaults to zero.
 * @property {number} total_rates - The total number of unique rate entries for the technician, determined by distinct rate dates.
 * @property {number} total_maintenances - The total count of unique maintenance entries for the technician, determined by distinct maintenance dates.
 */
export const TechnicianPerformanceSelection = {
  id: technician.id_user,
  name: user.name,
  score_avg: sql<number>`COALESCE(ROUND(${avg(rate.score)},1),0)`.as('score_avg'),
  total_rates: countDistinct(rate.date),
  total_maintenances: countDistinct(maintenance.date)
};

/**
 * Represents the type of intervention performed by a technician.
 *
 * @typedef {Object} TechnicianInterventionType
 * @property {string} date - The date when the intervention occurred, formatted as a string.
 * @property {string} type - A description or classification of the intervention type.
 * @property {string} aditional_info - Extra information or context related to the intervention.
 */
export type TechnicianInterventionType = {
  date: string;
  type: string;
  aditional_info: string;
};

/**
 * Object representing the selection of technician fields for database queries.
 *
 * Includes fields from the user, department, and technician schemas.
 */

/**
 * Represents a record of technician rates specific to interventions.
 *
 * @typedef {Object} TechniciansRatesInterventions
 * @property {Date} date - The date associated with the technician's rate.
 * @property {string} type - The type of intervention, defaulted to 'Valoración'.
 * @property {string} aditional_info - Additional information or comments associated with the rate.
 */
export const TechniciansRatesInterventions = {
  date: rate.date,
  type: sql<string>`'Valoración'`.as('type'),
  aditional_info: sql<string>`CAST(${rate.comment} AS VARCHAR)`.as('aditional_info')
};

/**
 * Represents the details of technicians' maintenance interventions.
 *
 * @typedef {Object} TechniciansMaintenancesInterventions
 * @property {string|Date} date - The date of the maintenance intervention.
 * @property {string} type - The type of the intervention, specifically labeled as "Mantenimiento".
 * @property {string} aditional_info - Additional information about the intervention, formatted as a string.
 */
export const TechniciansMaintenancesInterventions = {
  date: maintenance.date,
  type: sql<string>`'Mantenimiento'`.as('type'),
  aditional_info: sql<string>`CAST(${maintenance.type} AS VARCHAR)`.as('aditional_info')
};

/**
 * Represents a structured object containing information about technicians, their downtimes, and related interventions.
 *
 * @property {Date} date - The date of the downtime event.
 * @property {string} type - The type of the downtime event, labeled as 'Baja'.
 * @property {string} aditional_info - Additional information about the downtime status, cast to a string representation.
 */
export const TechniciansDowntimesInterventions = {
  date: downtime.date,
  type: sql<string>`'Baja'`.as('type'),
  aditional_info: sql<string>`CAST(${downtime.status} AS VARCHAR)`.as('aditional_info')
};

/**
 * Represents the selection of a technician with various details.
 *
 * @typedef {Object} technicianSelection
 * @property {number|string} id - The unique identifier for the technician.
 * @property {string} name - The full name of the technician.
 * @property {Object} department - Information about the department to which the technician belongs.
 * @property {number|string} department.id - The unique identifier for the department.
 * @property {string} department.name - The name of the department.
 * @property {string} role - The role or position of the technician within the organization.
 * @property {number} exp_years - The number of years of experience the technician has.
 * @property {string} specialty - The area of expertise or specialty of the technician.
 */
export const technicianSelection = {
  id: user.id,
  name: user.name,
  department: {
    id: department.id,
    name: department.name
  },
  role: user.role,
  exp_years: technician.exp_years,
  specialty: technician.specialty
};

/**
 * Represents a subset of information about a technician.
 *
 * This type is created by picking specific properties ('id' and 'name')
 * from the `TechnicianType` type. It can be used in cases where
 * only a limited amount of data about a technician is required.
 *
 * Properties:
 * - id: The unique identifier for the technician.
 * - name: The name of the technician.
 */
export type TechnicianInfo = Pick<TechnicianType, 'id' | 'name'>;

/**
 * Represents a data structure for storing and managing technician performance details.
 * This interface is designed to track a technician's performance stats such as name,
 * average score, total rates, and total number of maintenances completed.
 *
 * @interface TechnicianPerformanceTypeTable
 * @property {string} Name - The name of the technician.
 * @property {number} Score_Avg - The average performance score of the technician.
 * @property {number} Total_Rates - The total number of rates assigned to the technician.
 * @property {number} Total_Maintenances - The total number of maintenances completed by the technician.
 */
export interface TechnicianPerformanceTypeTable {
  Name: string;
  Score_Avg: number;
  Total_Rates: number;
  Total_Maintenances: number;
}

/**
 * Represents a table entry for a technician's intervention type.
 *
 * This interface is intended to define the structure for storing data
 * related to an intervention type performed by a technician, including
 * the date of the intervention, its type, and any additional information.
 *
 * Fields:
 * - Date: The date when the intervention took place, represented as a string.
 * - Type: The type or category of the intervention performed, represented as a string.
 * - Additional_Info: Any extra information relevant to the intervention, represented as a string.
 */
export interface TechnicianInterventionTypeTable {
  Date: string;
  Type: string;
  Additional_Info: string;
}
