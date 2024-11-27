import { UserModel } from './features/User/model';
import { UserController } from './features/User/controller';
import { TechnicianModel } from './features/Technician/model';
import { TechnicianController } from './features/Technician/controller';

export const userModel = new UserModel();
export const userController = new UserController(userModel);
export const technicianModel = new TechnicianModel();
export const technicianController = new TechnicianController();
