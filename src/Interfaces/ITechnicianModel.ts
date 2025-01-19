import { Technician, NewTechnician } from '../features/Technician/schema';
import { TechnicianQuery } from '../features/Technician/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface ITechnicianModel extends IRepository<TechnicianQuery, NewTechnician, Technician> {}
