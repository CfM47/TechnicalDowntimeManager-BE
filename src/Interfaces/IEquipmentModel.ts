import { Equipment, NewEquipment } from '../features/Equipment/schema';
import { EquipmentQuery } from '../features/Equipment/utils';
import { IRepository } from './IRepository';
import { EquipmentType, EquipmentWithMaintenances } from '../features/Equipment/types';
import { PaginatedResponse, Pagination } from '../utils';

/**
 * The IEquipmentModel interface extends the generic IRepository interface,
 * providing operations specific to equipment entities within the application.
 * It includes methods for querying and managing equipment-related data,
 * along with additional functionalities tailored to equipment maintenance needs.
 *
 * This interface includes a method to retrieve equipment with frequent maintenance issues
 * while supporting paginated responses for optimizing client requests and server efficiency.
 */
export interface IEquipmentModel
  extends IRepository<EquipmentQuery, NewEquipment, Equipment, EquipmentType> {
  getEquipmentsWithFrequentMaintenances(
    pagination: Pagination
  ): Promise<PaginatedResponse<EquipmentWithMaintenances>>;
}
