import { createApp } from './app';
import { Models } from './utils';
import { UserModel } from './features/User/model';
import { TechnicianModel } from './features/Technician/model';
import { EquipmentModel } from './features/Equipment/model';
import { RateModel } from './features/Rate/model';
import { RoleModel } from './features/Role/model';
import { DepartmentModel } from './features/Department/model';
import { TransferModel } from './features/Transfer/model';
import { DowntimeModel } from "./features/Downtime/model";
import { MaintenanceModel } from './features/Maintenance/model';

const appModels: Models = {
  userModel: new UserModel(),
  technicianModel: new TechnicianModel(),
  equipmentModel: new EquipmentModel(),
  rateModel: new RateModel(),
  roleModel: new RoleModel(),
  transferModel: new TransferModel(),
  departmentModel: new DepartmentModel(),
  downtimeModel: new DowntimeModel(),
  maintenanceModel: new MaintenanceModel()
};

createApp(appModels);