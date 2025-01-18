import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface IEquipmentModel extends IRepository<EquipmentQuery, NewEquipment, Equipment> {}
