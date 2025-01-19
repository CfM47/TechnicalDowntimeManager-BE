import { Maintenance, NewMaintenance } from '../features/Maintenance/schema';
import { MaintenanceQuery } from '../features/Maintenance/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface IMaintenanceModel
  extends IRepository<MaintenanceQuery, NewMaintenance, Maintenance> {}
