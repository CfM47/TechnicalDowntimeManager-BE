import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { technician } from './schema';
import { TechnicianQuery, TechnicianQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class TechnicianModel extends IRepository<TechnicianQuery> implements ITechnicianModel {
  constructor() {
    super(technician, TechnicianQueryBuilder);
  }
}
