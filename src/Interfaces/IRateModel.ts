import { Rate, NewRate } from '../features/Rate/schema';
import { RateQuery } from '../features/Rate/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface IRateModel extends IRepository<RateQuery, NewRate, Rate> {}
