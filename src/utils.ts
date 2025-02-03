import { ZodObject, ZodRawShape, ZodSchema } from 'zod';
import { IUserModel } from './Interfaces/IUserModel';
import { ITechnicianModel } from './Interfaces/ITechnicianModel';
import { IEquipmentModel } from './Interfaces/IEquipmentModel';
import { IRateModel } from './Interfaces/IRateModel';
import { ITransferModel } from './Interfaces/ITransferModel';
import { IDepartmentModel } from './Interfaces/IDepartmentModel';
import { IDowntimeModel } from './Interfaces/IDowntimeModel';
import { IMaintenanceModel } from './Interfaces/IMaintenanceModel';
import { PgTable } from 'drizzle-orm/pg-core';
import { db } from './db/config/db_connect';
import { and, count, SQL } from 'drizzle-orm';

/**
 * Represents a function to generate a standardized error message object.
 *
 * This function takes any input and returns an object containing a
 * message property. If the input is an instance of the Error class, the
 * message property will contain the message of the error. Otherwise, it
 * will default to a generic error message.
 *
 * @param {any} e - The input value, expected to be an error object or other data.
 * @returns {{message: string}} An object containing the error message as a string.
 */
export const ErrorMessage = (e: any) => {
  return { message: e instanceof Error ? e.message : 'An unknown error occurred' };
};

/**
 * Validates an object against a given schema.
 *
 * @param {any} object - The object to be validated.
 * @param {ZodSchema<T>} schema - The schema used for validation.
 * @return {SafeParseReturnType<T, T>} The result of the validation, including success status and parsed data or errors.
 */
export function validate<T>(object: any, schema: ZodSchema<T>) {
  return schema.safeParse(object);
}

/**
 * Validates and partially updates an object against a specified Zod schema.
 *
 * @param {any} object - The object to be validated and updated.
 * @param {ZodObject<T>} schema - The Zod schema used for validation and partial updates.
 * @returns {SafeParseReturnType<any, any>} The result of the validation, containing either the validated data or error details.
 */
export function validateUpdate<T extends ZodRawShape>(object: any, schema: ZodObject<T>) {
  return schema.partial().safeParse(object);
}

/**
 * Represents pagination information for dividing a dataset into pages.
 * Used to manage and specify the current page and the number of items per page.
 *
 * @interface Pagination
 * @property {number} page - The current page number, starting from 1.
 * @property {number} size - The number of items per page.
 */
export interface Pagination {
  page: number;
  size: number;
}

/**
 * Defines the default pagination settings used in the application.
 *
 * This variable specifies the initial page and size of items to display per page
 * when no specific pagination configuration is provided.
 *
 * @typedef {Object} Pagination
 * @property {number} page - The current page number in the pagination.
 * @property {number} size - The number of items to display per page.
 *
 * @type {Pagination}
 */
export const defaultPagination: Pagination = {
  page: 1,
  size: 6
};

/**
 * Validates and processes pagination parameters.
 *
 * This function takes in potential page and size parameters, parses them as integers,
 * and returns an object containing the validated pagination data. If the provided
 * parameters are invalid or not provided, default pagination values are used instead.
 *
 * @param {any} page - The current page number, provided as input.
 * @param {any} size - The number of items per page, provided as input.
 * @returns {Pagination} An object containing the validated page and size values.
 */
export const validatePagination = (page: any, size: any): Pagination => {
  const resultPage: number = page ? parseInt(page) : defaultPagination.page;
  const resultSize: number = size ? parseInt(size) : defaultPagination.size;
  return { page: resultPage, size: resultSize };
};

/**
 * Represents a generic paginated response.
 *
 * This interface is used to model the structure of a paginated result set,
 * which includes the items for the current page, pagination details,
 * and total count of items.
 *
 * @template T - The type of items contained in the response.
 * @property items - The list of items for the current page.
 * @property page - The current page number.
 * @property size - The number of items per page.
 * @property total - The total number of available items across all pages.
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}

/**
 * An object representing a table type for counting purposes.
 *
 * @typedef {Object} countTableType
 * @property {number} count - Represents the count value.
 */
export const countTableType = {
  count: count()
};

/**
 * Counts the number of rows in the specified table that match the given filters.
 *
 * @param {PgTable} table - The database table to count rows from.
 * @param {SQL[]} filter - An array of SQL filter conditions to apply to the query.
 * @return {Promise<number>} A promise that resolves to the number of rows matching the filters.
 */
export async function countTableRows(table: PgTable, filter: SQL[]): Promise<number> {
  const [result] = await db
    .select(countTableType)
    .from(table)
    .where(and(...filter));
  return result.count;
}

/**
 * Represents a collection of models used in the application.
 *
 * This type defines the structure for various models required in the system,
 * including user, technician, equipment, rate, transfer, department, downtime,
 * and maintenance models.
 *
 * Each individual model should comply with its respective interface,
 * ensuring a consistent structure throughout the application.
 */
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
