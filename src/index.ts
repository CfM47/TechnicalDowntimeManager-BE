import { createApp } from './app';
import { Models } from './utils';
import { UserModel } from './features/User/model';
import { TechnicianModel } from './features/Technician/model';
import { EquipmentModel } from './features/Equipment/model';
import { RateModel } from './features/Rate/model';

const appModels: Models = {
  userModel: new UserModel(),
  technicianModel: new TechnicianModel(),
  equipmentModel: new EquipmentModel(),
  rateModel: new RateModel()
};

createApp(appModels);
