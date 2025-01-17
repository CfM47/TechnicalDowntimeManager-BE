import { DowntimeQuery } from '../features/Downtime/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDowntimeModel extends IRepository<DowntimeQuery> {}
