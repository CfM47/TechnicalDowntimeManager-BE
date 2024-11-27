import { Equipment, NewEquipment } from '../../db/schemas/equipment';

export interface IEquipmentModel {
  create(newEquipment: NewEquipment): Promise<Equipment>;

  getAll(): Promise<Equipment[]>;

  getById(id: string): Promise<Equipment | null>;

  update(id: string, equipmentData: Partial<Equipment>): Promise<Equipment | null>;

  delete(id: string): Promise<void>;
}
