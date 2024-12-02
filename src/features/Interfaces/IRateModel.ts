import { Rate , NewRate} from '../../db/schemas/rate';
import {SQL} from 'drizzle-orm';

export interface IRateModel {

  create(newRate: NewRate): Promise<Rate>;

  getAll(): Promise<Rate[]>;

  getById(keys : SQL[]): Promise<Rate | null>;

  update(keys: SQL[], rateData : Partial<Rate>): Promise<Rate | null>;

  delete(keys: SQL[]): Promise<void>;
}