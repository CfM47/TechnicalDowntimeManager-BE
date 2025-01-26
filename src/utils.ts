import { ZodObject, ZodRawShape, ZodSchema } from 'zod';
import { IUserModel } from './Interfaces/IUserModel';
import { ITechnicianModel } from './Interfaces/ITechnicianModel';
import { IEquipmentModel } from './Interfaces/IEquipmentModel';
import { IRateModel } from './Interfaces/IRateModel';
import { ITransferModel } from './Interfaces/ITransferModel';
import { IDepartmentModel } from './Interfaces/IDepartmentModel';
import { IDowntimeModel } from './Interfaces/IDowntimeModel';
import { IMaintenanceModel } from './Interfaces/IMaintenanceModel';

/**
 * Utility functions and types for validation and error handling.
 */

/**
 * Generates an error message object.
 * @param {any} e - The error object.
 * @returns {{ message: string }} - An object containing the error message.
 */
export const ErrorMessage = (e: any) => {
  return { message: e instanceof Error ? e.message : 'An unknown error occurred' };
};

/**
 * Validates an object against a Zod schema.
 * @template T
 * @param {any} object - The object to validate.
 * @param {ZodSchema<T>} schema - The Zod schema to validate against.
 * @returns {ZodParseResult<T>} - The result of the validation.
 */
export function validate<T>(object: any, schema: ZodSchema<T>) {
  return schema.safeParse(object);
}

/**
 * Validates an object against a partial Zod schema for updates.
 * @template T
 * @param {any} object - The object to validate.
 * @param {ZodObject<T>} schema - The Zod schema to validate against.
 * @returns {ZodParseResult<Partial<T>>} - The result of the validation.
 */
export function validateUpdate<T extends ZodRawShape>(object: any, schema: ZodObject<T>) {
  return schema.partial().safeParse(object);
}

/**
 * Type definition for the models used in the application.
 * @typedef {Object} Models
 * @property {IUserModel} userModel - The user model.
 * @property {ITechnicianModel} technicianModel - The technician model.
 * @property {IEquipmentModel} equipmentModel - The equipment model.
 * @property {IRateModel} rateModel - The rate model.
 * @property {ITransferModel} transferModel - The transfer model.
 * @property {IDepartmentModel} departmentModel - The department model.
 * @property {IDowntimeModel} downtimeModel - The downtime model.
 * @property {IMaintenanceModel} maintenanceModel - The maintenance model.
 */

export interface Pagination {
  page: number;
  size: number;
}

export const defaultPagination: Pagination = {
  page: 1,
  size: 6
};

export const validatePagination = (page: any, size: any): Pagination => {
  const resultPage: number = page ? parseInt(page) : defaultPagination.page;
  const resultSize: number = size ? parseInt(size) : defaultPagination.size;
  return { page: resultPage, size: resultSize };
};

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