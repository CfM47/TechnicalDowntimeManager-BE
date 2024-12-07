import { ZodObject, ZodRawShape, ZodSchema } from 'zod';
import { IUserModel } from './features/Interfaces/IUserModel';
import { ITechnicianModel } from './features/Interfaces/ITechnicianModel';
import { IEquipmentModel } from './features/Interfaces/IEquipmentModel';
import { IRateModel } from './features/Interfaces/IRateModel';
import { IRoleModel } from './features/Interfaces/IRoleModel';
import { ITransferModel } from './features/Interfaces/ITransferModel';
import { IDepartmentModel } from './features/Interfaces/IDepartmentModel';
import { IDowntimeModel} from "./features/Interfaces/IDowntimeModel";

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
  roleModel: IRoleModel;
  transferModel : ITransferModel;
  departmentModel : IDepartmentModel;
  downtimeModel : IDowntimeModel;
};