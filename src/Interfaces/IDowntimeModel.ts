import { Downtime, NewDowntime } from '../features/Downtime/schema';
import { DowntimeQuery } from '../features/Downtime/utils';
import { IRepository } from './IRepository';
import { DowntimeType } from '../features/Downtime/types';
import { PaginatedResponse, Pagination } from '../utils';

/**
 * Interface representing a model for handling downtime-related data operations.
 * Extends the capabilities of the generic IRepository with additional methods specific to downtime management.
 *
 * @extends IRepository
 *
 * @template DowntimeQuery - The type representing the structure of downtime query parameters.
 * @template NewDowntime - The type representing the structure of a new downtime record.
 * @template Downtime - The type representing the structure of an existing downtime record.
 * @template DowntimeType - The type representing the detailed structure or category of downtime information.
 */

export interface IDowntimeModel
  extends IRepository<DowntimeQuery, NewDowntime, Downtime, DowntimeType> {
  getLastYearDowntime(pagination: Pagination): Promise<PaginatedResponse<DowntimeType>>;
}
