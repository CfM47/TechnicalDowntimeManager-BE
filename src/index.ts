import { createApp } from './app';
import { Models } from './utils';
import { UserModel } from './features/User/model';
import { TechnicianModel } from './features/Technician/model';
import { EquipmentModel } from './features/Equipment/model';
import { RateModel } from './features/Rate/model';
import { DepartmentModel } from './features/Department/model';
import { TransferModel } from './features/Transfer/model';
import { DowntimeModel } from './features/Downtime/model';
import { MaintenanceModel } from './features/Maintenance/model';

/**
 * An object containing various application models used throughout the system.
 * Each property represents a specific model related to the application's functionalities.
 *
 * Properties:
 * - `userModel` - Represents the User model.
 * - `technicianModel` - Represents the Technician model.
 * - `equipmentModel` - Represents the Equipment model.
 * - `rateModel` - Represents the Rate model.
 * - `transferModel` - Represents the Transfer model.
 * - `departmentModel` - Represents the Department model.
 * - `downtimeModel` - Represents the Downtime model.
 * - `maintenanceModel` - Represents the Maintenance model.
 *
 * This collection of models serves as the primary interface for accessing
 * and managing the entities associated with the respective domains.
 */
export const appModels: Models = {
  userModel: new UserModel(),
  technicianModel: new TechnicianModel(),
  equipmentModel: new EquipmentModel(),
  rateModel: new RateModel(),
  transferModel: new TransferModel(),
  departmentModel: new DepartmentModel(),
  downtimeModel: new DowntimeModel(),
  maintenanceModel: new MaintenanceModel()
};

createApp(appModels);
