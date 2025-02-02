import { UserType } from '../User/types';
import { technician } from './schema';
import { user } from '../User/schema';
import { department } from '../Department/schema';
import { avg, countDistinct } from 'drizzle-orm/sql/functions/aggregate';
import { rate } from '../Rate/schema';
import { maintenance } from '../Maintenance/schema';
import { sql } from 'drizzle-orm';

/**
 * Interface representing a Technician.
 *
 * Extends the UserType interface to include additional properties specific to technicians.
 *
 * Properties:
 * - `exp_years`: Number of years of experience the technician has.
 * - `specialty`: The technician's area of expertise.
 */
export interface TechnicianType extends UserType {
  exp_years: number;
  specialty: string;
}

export interface TechnicianPerformanceType {
  id: string;
  name: string;
  score_avg: number;
  total_rates: number;
  total_maintenances: number;
}

export const TechnicianPerformanceSelection = {
  id: technician.id_user,
  name: user.name,
  score_avg: sql<number>`COALESCE(ROUND(${avg(rate.score)},1),0)`.as('score_avg'),
  total_rates: countDistinct(rate.date),
  total_maintenances: countDistinct(maintenance.date)
};

/**
 * Object representing the selection of technician fields for database queries.
 *
 * Includes fields from the user, department, and technician schemas.
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
 * Type representing basic information about a Technician.
 *
 * Includes only the `id` and `name` properties from the TechnicianType interface.
 */
export type TechnicianInfo = Pick<TechnicianType, 'id' | 'name'>;
