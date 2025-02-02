import { ZodObject, ZodRawShape, ZodSchema } from 'zod';
import { IUserModel } from './Interfaces/IUserModel';
import { ITechnicianModel } from './Interfaces/ITechnicianModel';
import { IEquipmentModel } from './Interfaces/IEquipmentModel';
import { IRateModel } from './Interfaces/IRateModel';
import { IRoleModel } from './Interfaces/IRoleModel';
import { ITransferModel } from './Interfaces/ITransferModel';
import { IDepartmentModel } from './Interfaces/IDepartmentModel';
import { IDowntimeModel } from './Interfaces/IDowntimeModel';
import { IMaintenanceModel } from './Interfaces/IMaintenanceModel';
import { PgTable } from 'drizzle-orm/pg-core';
import { db } from './db/config/db_connect';
import { and, count, SQL } from 'drizzle-orm';
import { IResourceModel } from './Interfaces/IResourceModel';
import { IRoleResourceModel } from './Interfaces/IRoleResourceModel';

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

export interface Pagination {
  page: number;
  size: number;
}

/**
 * Default pagination settings.
 */
export const defaultPagination: Pagination = {
  page: 1,
  size: 6
};

/**
 * Validates and parses pagination parameters.
 * @param {any} page - The page number.
 * @param {any} size - The page size.
 * @returns {Pagination} - The validated pagination object.
 */
export const validatePagination = (page: any, size: any): Pagination => {
  const resultPage: number = page ? parseInt(page) : defaultPagination.page;
  const resultSize: number = size ? parseInt(size) : defaultPagination.size;
  return { page: resultPage, size: resultSize };
};

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}

export const countTableType = {
  count: count()
};

/**
 * Counts the number of rows in a given table.
 * @param {PgTable} table - The table to count rows in.
 * @param filter
 * @returns {Promise<number>} - The number of rows in the table.
 */
export async function countTableRows(table: PgTable, filter: SQL[]): Promise<number> {
  const [result] = await db
    .select(countTableType)
    .from(table)
    .where(and(...filter));
  return result.count;
}

export type Models = {
  userModel: IUserModel;
  technicianModel: ITechnicianModel;
  equipmentModel: IEquipmentModel;
  rateModel: IRateModel;
  roleModel: IRoleModel;
  transferModel: ITransferModel;
  departmentModel: IDepartmentModel;
  downtimeModel: IDowntimeModel;
  maintenanceModel: IMaintenanceModel;
  resourceModel: IResourceModel;
  roleResourceModel: IRoleResourceModel;
};
