import { Technician, NewTechnician } from '../../db/schemas/technician';

export interface ITechnicianModel {
  create(newTechnician: NewTechnician): Promise<Technician>;

  getAll(): Promise<Technician[]>;

  getById(id: string): Promise<Technician | null>;

  update(id: string, technicianData: Partial<Technician>): Promise<Technician | null>;

  delete(id: string): Promise<void>;
}
