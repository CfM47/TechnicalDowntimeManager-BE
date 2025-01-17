import { MaintenanceQuery } from '../features/Maintenance/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IMaintenanceModel extends IRepository<MaintenanceQuery> {}
