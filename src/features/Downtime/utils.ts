import z from 'zod';
import { eq, SQL } from 'drizzle-orm';
import { downtime } from './schema';
import { DowntimeStatuses } from '../../enums';
import { DowntimeLastYearTypeTable, DowntimeType } from './types';

/**
 * Represents the status of downtime using a predefined enumeration.
 *
 * `downtimeStatus` is a variable assigned to a Zod enum schema
 * that contains the permissible statuses for a downtime scenario.
 * The enumeration values are defined by the `DowntimeStatuses` object.
 *
 * This variable is used to validate and enforce that the status
 * falls within the predefined set of acceptable downtime statuses.
 *
 * Example usages may include validation of inputs, ensuring data
 * consistency across the application, and conforming to business rules.
 */
const downtimeStatus = z.enum(DowntimeStatuses);

/**
 * Downtime schema definition.
 *
 * Represents the data structure for downtime records.
 *
 * Properties:
 * - id_sender: A UUID string representing the sender's unique identifier.
 * - id_receiver: A UUID string representing the receiver's unique identifier.
 * - id_equipment: A UUID string representing the equipment's unique identifier.
 * - id_dep_receiver: A UUID string representing the department or receiver's unique identifier.
 * - status: The current status of the downtime, represented as `downtimeStatus`.
 * - cause: A string providing the reason or cause of the downtime.
 */
export const downtimeSchema = z.object({
  id_sender: z.string().uuid(),
  id_receiver: z.string().uuid(),
  id_equipment: z.string().uuid(),
  id_dep_receiver: z.string().uuid(),
  status: downtimeStatus,
  cause: z.string()
});

/**
 * Represents a query object for filtering and retrieving downtime records.
 * This type allows specifying various optional parameters to narrow down the search criteria.
 *
 * @typedef {Object} DowntimeQuery
 * @property {string} [id_sender] - The identifier of the sender related to the downtime.
 * @property {string} [id_receiver] - The identifier of the receiver related to the downtime.
 * @property {string} [id_equipment] - The identifier of the equipment associated with the downtime.
 * @property {string} [date] - The specific date of the downtime in string format.
 * @property {string} [id_dep_receiver] - The identifier for the department of the receiver.
 * @property {string} [status] - The current status of the downtime event.
 * @property {string} [cause] - The cause or reason for the downtime.
 */
export type DowntimeQuery = {
  id_sender?: string;
  id_receiver?: string;
  id_equipment?: string;
  date?: string;
  id_dep_receiver?: string;
  status?: string;
  cause?: string;
};

/**
 * Builds and returns an array of SQL filters based on the given downtime query parameters.
 *
 * @param {DowntimeQuery} query - An object containing various filter criteria for downtime records,
 * including id_sender, id_receiver, id_equipment, date, id_dep_receiver, status, and cause.
 * @return {SQL[]} An array of SQL filters that can be used to query downtime records.
 */
export function DowntimeQueryBuilder(query: DowntimeQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id_sender) filters.push(eq(downtime.id_sender, query.id_sender));
  if (query.id_receiver) filters.push(eq(downtime.id_receiver, query.id_receiver));
  if (query.id_equipment) filters.push(eq(downtime.id_equipment, query.id_equipment));
  if (query.date) filters.push(eq(downtime.date, query.date));
  if (query.id_dep_receiver) filters.push(eq(downtime.id_dep_receiver, query.id_dep_receiver));
  if (query.status) filters.push(eq(downtime.status, query.status));
  if (query.cause) filters.push(eq(downtime.cause, query.cause));
  return filters;
}

/**
 * Maps a DowntimeType object to a DowntimeLastYearTypeTable object.
 *
 * @param {DowntimeType} downtime - The downtime data object containing details such as sender, receiver, equipment, and destination.
 * @return {DowntimeLastYearTypeTable} A transformed object containing mapped values for last year's downtime type table.
 */
export function mapToLastYearTypeTable(downtime: DowntimeType): DowntimeLastYearTypeTable {
  return {
    Sender: downtime.sender.name,
    Receiver: downtime.receiver.name,
    Equipment: downtime.equipment.name,
    Destiny: downtime.dep_receiver.name
  };
}
