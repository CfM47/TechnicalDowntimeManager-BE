import { IEquipmentModel } from '../../Interfaces/IEquipmentModel';
import { equipment } from './schema';
import { EquipmentQuery, EquipmentQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class EquipmentModel extends IRepository<EquipmentQuery> implements IEquipmentModel {
  constructor() {
    super(equipment, EquipmentQueryBuilder);
  }
}
