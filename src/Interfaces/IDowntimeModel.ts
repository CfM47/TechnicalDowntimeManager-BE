import { Downtime, NewDowntime } from '../features/Downtime/schema';
import { DowntimeQuery } from '../features/Downtime/utils';
import { IRepository } from './IRepository';
import { DowntimeLastYearType, DowntimeType } from '../features/Downtime/types';
import { Pagination } from '../utils';

/**
 * Interface for the Downtime model.
 *
 * This interface extends the generic repository interface `IRepository`
 * with specific methods for handling downtime data.
 */

export interface IDowntimeModel
  extends IRepository<DowntimeQuery, NewDowntime, Downtime, DowntimeType> {
  getLastYearDowntime(pagination: Pagination): Promise<DowntimeLastYearType[]>;
}
