import { Maintenance, NewMaintenance } from '../features/Maintenance/schema';
import { MaintenanceQuery } from '../features/Maintenance/utils';
import { IRepository } from './IRepository';
import { MaintenanceType } from '../features/Maintenance/types';

/**
 * IMaintenanceModel is an interface that extends IRepository with specific type parameters.
 * This interface represents the contract for managing and performing operations related to maintenance data.
 *
 * Type Parameters:
 * - MaintenanceQuery: Defines the type for querying maintenance data.
 * - NewMaintenance: Represents the type for creating new maintenance records.
 * - Maintenance: Represents the type for returned or existing maintenance records.
 * - MaintenanceType: Represents the type categorization or classification of maintenance.
 */
// eslint-disable-next-line
export interface IMaintenanceModel
  extends IRepository<MaintenanceQuery, NewMaintenance, Maintenance, MaintenanceType> {}
