import { maintenance } from './schema';
import { IMaintenanceModel } from '../../Interfaces/IMaintenanceModel';
import { MaintenanceQuery, MaintenanceQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class MaintenanceModel extends IRepository<MaintenanceQuery> implements IMaintenanceModel {
  constructor() {
    super(maintenance, MaintenanceQueryBuilder);
  }
}
