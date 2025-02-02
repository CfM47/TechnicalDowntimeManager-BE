import { Technician, NewTechnician } from '../features/Technician/schema';
import { TechnicianQuery } from '../features/Technician/utils';
import { IRepository } from './IRepository';
import { TechnicianPerformanceType, TechnicianType } from '../features/Technician/types';
import { PaginatedResponse, Pagination } from '../utils';

/**
 * Interface for the Technician model, extending the generic repository interface.
 */
export interface ITechnicianModel
  extends IRepository<TechnicianQuery, NewTechnician, Technician, TechnicianType> {
  getTechniciansPerformance(
    pagination: Pagination
  ): Promise<PaginatedResponse<TechnicianPerformanceType>>;
}
