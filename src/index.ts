import { createApp } from './app';
import { Models } from './utils';
import { UserModel } from './features/User/model';
import { TechnicianModel } from './features/Technician/model';

const appModels : Models = {
    userModel: new UserModel(),
    technicianModel: new TechnicianModel()
}

createApp(appModels);
