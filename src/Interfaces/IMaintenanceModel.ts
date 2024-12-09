import { Maintenance, NewMaintenance } from '../features/Maintenance/schema';
import { MaintenanceQuery } from '../features/Maintenance/utils';

export interface IMaintenanceModel {
  create(newMaintenance: NewMaintenance): Promise<Maintenance>;

  getAll(): Promise<Maintenance[]>;

  getById(keys: MaintenanceQuery): Promise<Maintenance | null>;

  update(
    keys: MaintenanceQuery,
    maintenanceData: Partial<Maintenance>
  ): Promise<Maintenance | null>;

  delete(keys: MaintenanceQuery): Promise<void>;
}
