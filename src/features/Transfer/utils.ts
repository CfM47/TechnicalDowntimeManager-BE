import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { transfer } from './schema';
import { TransferStatuses } from '../../enums';
import {
  DepartmentTransferRecordTypeTable,
  EquipmentTransferRecordTypeTable,
  TransferType
} from './types';

/**
 * Represents the status of a transfer operation.
 *
 * The `transferStatus` variable ensures that only values from the predefined `TransferStatuses` enumeration are allowed.
 * It enforces type safety by validating the status of a transfer against the specified enumeration.
 *
 * Use this variable to store or validate the current status of transfer-related processes in the system.
 */
const transferStatus = z.enum(TransferStatuses);

/**
 * Enum for transfer statuses.
 */

/**
 * Schema definition for a transfer object.
 *
 * This schema is used to validate the data structure for transfers involving a sender,
 * receiver, equipment, receiver department, and the transfer status. Each field is expected
 * to meet specific validation requirements.
 *
 * Fields:
 * - id_sender: Represents the unique identifier for the sender. Must be a valid UUID.
 * - id_receiver: Represents the unique identifier for the receiver. Must be a valid UUID.
 * - id_equipment: Represents the unique identifier for the equipment being transferred. Must be a valid UUID.
 * - id_receiver_dep: Represents the unique identifier for the receiver's department. Must be a valid UUID.
 * - status: Represents the current status of the transfer. Refers to the predefined transferStatus schema.
 */
export const transferSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_receiver_dep: z.string().uuid(),
  status: transferStatus
});

/**
 * Represents a transfer query with optional parameters for filtering or specifying transfer details.
 *
 * This type is used to define the structure of a transfer query object.
 *
 * Properties:
 * - `id_sender` (string, optional): The unique identifier of the sender.
 * - `id_receiver` (string, optional): The unique identifier of the receiver.
 * - `id_equipment` (string, optional): The unique identifier of the equipment being transferred.
 * - `date` (string, optional): The date of the transfer in a specific format (e.g., ISO 8601).
 * - `id_origin_dep` (string, optional): The unique identifier of the originating department.
 * - `id_receiver_dep` (string, optional): The unique identifier of the receiving department.
 * - `status` (string, optional): The status of the transfer (e.g., pending, completed, etc.).
 */
export type TransferQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_origin_dep?: string;
  id_receiver_dep?: string;
  status?: string;
};

/**
 * Builds a query for filtering transfer records based on the provided criteria.
 *
 * @param {TransferQuery} query - An object containing the filtering criteria for the transfer query.
 * The available properties in the query object include:
 *   - `id_sender`: The ID of the sender.
 *   - `id_receiver`: The ID of the receiver.
 *   - `id_equipment`: The ID of the equipment being transferred.
 *   - `date`: The date of the transfer.
 *   - `id_origin_dep`: The ID of the originating department.
 *   - `id_receiver_dep`: The ID of the receiving department.
 *   - `status`: The status of the transfer.
 * Only properties present in the query object will be used to generate filters.
 *
 * @return {SQL[]} An array of SQL filter conditions based on the given query parameters.
 */
export function TransferQueryBuilder(query: TransferQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_sender) filters.push(eq(transfer.id_sender, query.id_sender));
  if (query.id_receiver) filters.push(eq(transfer.id_receiver, query.id_receiver));
  if (query.id_equipment) filters.push(eq(transfer.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(transfer.date, query.date));
  if (query.id_origin_dep) filters.push(eq(transfer.id_origin_dep, query.id_origin_dep));
  if (query.id_receiver_dep) filters.push(eq(transfer.id_receiver_dep, query.id_receiver_dep));
  if (query.status) filters.push(eq(transfer.status, query.status));
  return filters;
}

/**
 * Maps a TransferType object to an EquipmentTransferRecordTypeTable.
 *
 * @param {TransferType} transfer - Object containing transfer details such as sender, origin department, destination department, receiver, and date.
 * @return {EquipmentTransferRecordTypeTable} A structured object that represents the transfer details in the format of an EquipmentTransferRecordTypeTable.
 */
export function mapToEquipmentTransferRecordTypeTable(
  transfer: TransferType
): EquipmentTransferRecordTypeTable {
  return {
    Sender: transfer.sender.name,
    Origin_Department: transfer.origin_dep.name,
    Destiny_Department: transfer.receiver_dep.name,
    Receiver: transfer.receiver.name,
    Date: transfer.date
  };
}

/**
 * Maps a TransferType object to a DepartmentTransferRecordTypeTable object.
 *
 * @param {TransferType} transfer - The transfer object containing details about the sender, receiver, origin department, and equipment.
 * @return {DepartmentTransferRecordTypeTable} A new object formatted as a DepartmentTransferRecordTypeTable with mapped properties.
 */
export function mapToDepartmentTransferRecordTypeTable(
  transfer: TransferType
): DepartmentTransferRecordTypeTable {
  return {
    Sender: transfer.sender.name,
    Receiver: transfer.receiver.name,
    Origin_Department: transfer.origin_dep.name,
    Equipment: transfer.equipment.name
  };
}
