import { Technician, NewTechnician } from '../features/Technician/schema';
import { TechnicianQuery } from '../features/Technician/utils';

export interface ITechnicianModel {
  create(newTechnician: NewTechnician): Promise<Technician>;

  getAll(): Promise<Technician[]>;

  getById(keys: TechnicianQuery): Promise<Technician | null>;

  update(keys: TechnicianQuery, technicianData: Partial<Technician>): Promise<Technician | null>;

  delete(keys: TechnicianQuery): Promise<void>;
}
