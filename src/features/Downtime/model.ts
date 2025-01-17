import { downtime } from './schema';
import { IDowntimeModel } from '../../Interfaces/IDowntimeModel';
import { DowntimeQuery, DowntimeQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class DowntimeModel extends IRepository<DowntimeQuery> implements IDowntimeModel {
  constructor() {
    super(downtime, DowntimeQueryBuilder);
  }
}
