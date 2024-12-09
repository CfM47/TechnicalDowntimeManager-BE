import { Maintenance, NewMaintenance } from '../../db/schemas/maintenance';
import { SQL } from 'drizzle-orm';

export interface IMaintenanceModel {
  create(newMaintenance: NewMaintenance): Promise<Maintenance>;

  getAll(): Promise<Maintenance[]>;

  getById(keys: SQL[]): Promise<Maintenance | null>;

  update(keys: SQL[], maintenanceData: Partial<Maintenance>): Promise<Maintenance | null>;

  delete(keys: SQL[]): Promise<void>;
}
