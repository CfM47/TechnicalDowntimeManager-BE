import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';
import { IRepository } from './IRepository';
import { EquipmentType } from '../features/Equipment/types';

/**
 * Interface for the Equipment model, extending the generic repository interface.
 */
// eslint-disable-next-line
export interface IEquipmentModel
  extends IRepository<EquipmentQuery, NewEquipment, Equipment, EquipmentType> {}