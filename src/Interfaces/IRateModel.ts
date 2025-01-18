import { Rate, NewRate } from '../features/Rate/schema';
import { RateQuery } from '../features/Rate/utils';

export interface IRateModel {
  create(newRate: NewRate): Promise<Rate>;

  getAll(): Promise<Rate[]>;

  getById(keys: RateQuery): Promise<Rate | null>;

  update(keys: RateQuery, rateData: Partial<Rate>): Promise<Rate | null>;

  delete(keys: RateQuery): Promise<void>;
}
