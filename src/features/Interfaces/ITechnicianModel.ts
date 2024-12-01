import { Technician, NewTechnician } from '../../db/schemas/technician';
import { SQL } from 'drizzle-orm';

export interface ITechnicianModel {
  create(newTechnician: NewTechnician): Promise<Technician>;

  getAll(): Promise<Technician[]>;

  getById(keys : SQL[]): Promise<Technician | null>;

  update(keys : SQL[], technicianData: Partial<Technician>): Promise<Technician | null>;

  delete(keys : SQL[]): Promise<void>;
}
