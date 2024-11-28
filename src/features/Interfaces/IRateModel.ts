import { Rate , NewRate} from '../../db/schemas/rate';

export interface IRateModel {

  create(newRate: NewRate): Promise<Rate>;

  getAll(): Promise<Rate[]>;

  getById(id_technician: string, id_user: string): Promise<Rate | null>;

  update(id_technician: string, id_user: string, rateData: Partial<Rate>): Promise<Rate | null>;

  delete(id_technician: string, id_user: string): Promise<void>;
}