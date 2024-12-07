import { Downtime, NewDowntime } from '../../db/schemas/downtime';
import { SQL } from 'drizzle-orm';

export interface IDowntimeModel {
  create(newDowntime: NewDowntime): Promise<Downtime>;

  getAll(): Promise<Downtime[]>;

  getById(keys: SQL[]): Promise<Downtime | null>;

  update(keys: SQL[], userData: Partial<Downtime>): Promise<Downtime | null>;

  delete(keys: SQL[]): Promise<void>;
}
