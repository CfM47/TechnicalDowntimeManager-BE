import { Downtime, NewDowntime } from '../features/Downtime/schema';
import { DowntimeQuery } from '../features/Downtime/utils';

export interface IDowntimeModel {
  create(newDowntime: NewDowntime): Promise<Downtime>;

  getAll(): Promise<Downtime[]>;

  getById(keys: DowntimeQuery): Promise<Downtime | null>;

  update(keys: DowntimeQuery, userData: Partial<Downtime>): Promise<Downtime | null>;

  delete(keys: DowntimeQuery): Promise<void>;
}
