import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';
import { IRepository } from './IRepository';
import { EquipmentType } from '../features/Equipment/types';

// eslint-disable-next-line
export interface IEquipmentModel
  extends IRepository<EquipmentQuery, NewEquipment, Equipment, EquipmentType> {}
