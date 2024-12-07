import { Equipment, NewEquipment } from '../../db/schemas/equipment';
import { SQL } from 'drizzle-orm';

export interface IEquipmentModel {
  create(newEquipment: NewEquipment): Promise<Equipment>;

  getAll(): Promise<Equipment[]>;

  getById(keys : SQL[]): Promise<Equipment | null>;

  update(keys : SQL[], equipmentData: Partial<Equipment>): Promise<Equipment | null>;

  delete(keys : SQL[]): Promise<void>;
}
