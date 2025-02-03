import { Rate, NewRate } from '../features/Rate/schema';
import { RateQuery } from '../features/Rate/utils';
import { IRepository } from './IRepository';
import { RateType } from '../features/Rate/types';

/**
 * Interface representing a rate model.
 *
 * IRateModel extends the generic IRepository interface, which defines the core
 * repository operations specific to rate models. The type parameters for
 * IRepository used in the declaration are:
 * - RateQuery: The object type for querying rates.
 * - NewRate: The object type for creating a new rate.
 * - Rate: The type representing a rate entity.
 * - RateType: The type representing different types/categories of rates.
 *
 * Implementations of this interface typically handle operations such as
 * fetching, creating, updating, or deleting rate entities, while adhering to
 * the structure and constraints defined by the IRepository interface.
 */
// eslint-disable-next-line
export interface IRateModel extends IRepository<RateQuery, NewRate, Rate, RateType> {}
