import { Downtime, NewDowntime } from '../features/Downtime/schema';
import { DowntimeQuery } from '../features/Downtime/utils';
import { IRepository } from './IRepository';
import { DowntimeType } from '../features/Downtime/types';

/**
 * Interface for the Downtime model, extending the generic repository interface.
 */
// eslint-disable-next-line
export interface IDowntimeModel
  extends IRepository<DowntimeQuery, NewDowntime, Downtime, DowntimeType> {}