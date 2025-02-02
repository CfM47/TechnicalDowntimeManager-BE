import { Technician, NewTechnician } from '../features/Technician/schema';
import { TechnicianQuery } from '../features/Technician/utils';
import { IRepository } from './IRepository';
import {
  TechnicianInterventionType,
  TechnicianPerformanceType,
  TechnicianType
} from '../features/Technician/types';
import { PaginatedResponse, Pagination } from '../utils';

/**
 * Interface for the Technician model, extending the generic repository interface.
 */
export interface ITechnicianModel
  extends IRepository<TechnicianQuery, NewTechnician, Technician, TechnicianType> {
  getTechniciansPerformance(
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianPerformanceType>>;
  getInterventionData(
    technicianId: string,
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianInterventionType>>;
}
