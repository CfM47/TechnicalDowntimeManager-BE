import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';

export interface IEquipmentModel {
  create(newEquipment: NewEquipment): Promise<Equipment>;

  getAll(): Promise<Equipment[]>;

  getById(keys: EquipmentQuery): Promise<Equipment | null>;

  update(keys: EquipmentQuery, equipmentData: Partial<Equipment>): Promise<Equipment | null>;

  delete(keys: EquipmentQuery): Promise<void>;
}
