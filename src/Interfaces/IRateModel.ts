import { Rate, NewRate } from '../features/Rate/schema';
import { RateQuery } from '../features/Rate/utils';
import { IRepository } from './IRepository';
import { RateType } from '../features/Rate/types';

/**
 * Interface for the Rate model, extending the generic repository interface.
 */
// eslint-disable-next-line
export interface IRateModel extends IRepository<RateQuery, NewRate, Rate, RateType> {}
