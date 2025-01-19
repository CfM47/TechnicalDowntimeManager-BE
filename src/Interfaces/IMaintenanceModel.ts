import { Maintenance, NewMaintenance } from '../features/Maintenance/schema';
import { MaintenanceQuery } from '../features/Maintenance/utils';
import { IRepository } from './IRepository';
import { MaintenanceType } from '../features/Maintenance/types';

// eslint-disable-next-line
export interface IMaintenanceModel
  extends IRepository<MaintenanceQuery, NewMaintenance, Maintenance, MaintenanceType> {}
