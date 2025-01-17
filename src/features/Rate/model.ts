import { rate } from './schema';
import { IRateModel } from '../../Interfaces/IRateModel';
import { RateQuery, RateQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class RateModel extends IRepository<RateQuery> implements IRateModel {
  constructor() {
    super(rate, RateQueryBuilder);
  }
}
