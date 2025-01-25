import { ZodObject, ZodRawShape, ZodSchema } from 'zod';
import { IUserModel } from './Interfaces/IUserModel';
import { ITechnicianModel } from './Interfaces/ITechnicianModel';
import { IEquipmentModel } from './Interfaces/IEquipmentModel';
import { IRateModel } from './Interfaces/IRateModel';
import { ITransferModel } from './Interfaces/ITransferModel';
import { IDepartmentModel } from './Interfaces/IDepartmentModel';
import { IDowntimeModel } from './Interfaces/IDowntimeModel';
import { IMaintenanceModel } from './Interfaces/IMaintenanceModel';

export const ErrorMessage = (e: any) => {
  return { message: e instanceof Error ? e.message : 'An unknown error occurred' };
};

export function validate<T>(object: any, schema: ZodSchema<T>) {
  return schema.safeParse(object);
}

export function validateUpdate<T extends ZodRawShape>(object: any, schema: ZodObject<T>) {
  return schema.partial().safeParse(object);
}

export type Models = {
  userModel: IUserModel;
  technicianModel: ITechnicianModel;
  equipmentModel: IEquipmentModel;
  rateModel: IRateModel;
  transferModel: ITransferModel;
  departmentModel: IDepartmentModel;
  downtimeModel: IDowntimeModel;
  maintenanceModel: IMaintenanceModel;
};
