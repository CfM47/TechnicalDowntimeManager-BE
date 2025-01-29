import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';
import { IRepository } from './IRepository';
import { EquipmentType } from '../features/Equipment/types';
import { PaginatedResponse, Pagination } from '../utils';

/**
 * Interface for the Equipment model, extending the generic repository interface.
 */
export interface IEquipmentModel
  extends IRepository<EquipmentQuery, NewEquipment, Equipment, EquipmentType> {
  getEquipmentsWithFrequentMaintenances(
    pagination: Pagination
  ): Promise<PaginatedResponse<EquipmentType>>;
}
