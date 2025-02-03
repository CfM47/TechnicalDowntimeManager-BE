import { pgTable, uuid, timestamp, real, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { equipment } from '../Equipment/schema';
import { MaintenanceTypes } from '../../enums';

/**
 * Represents an enumerated PostgreSQL type named 'maintenanceType' that is created using the provided `MaintenanceTypes`.
 * This type is typically used to define a set of constant values in the database for maintenance types.
 *
 * @typedef {pgEnum} maintenanceType
 * @param {string} maintenanceType - Enumeration name.
 * @param {object} MaintenanceTypes - The set of values to define the enum type.
 */

export const type = pgEnum('maintenanceType', MaintenanceTypes);

/**
 * Represents the 'maintenance' table in the database, containing details about equipment maintenance records.
 *
 * Fields:
 * - `id_technician`: A UUID referencing the unique identifier of the technician responsible for the maintenance. This field is mandatory and is a foreign key referencing the `id_user` column in the `technician` table.
 * - `id_equipment`: A UUID referencing the unique identifier of the equipment being maintained. This field is mandatory and is a foreign key referencing the `id` column in the `equipment` table.
 * - `date`: A timestamp indicating the date and time when the maintenance occurred. This field is mandatory, defaults to the current date and time, and is stored as a string.
 * - `type`: Represents the type of maintenance performed. This field is mandatory.
 * - `cost`: Represents the cost associated with the maintenance. This field is a real number and is mandatory.
 *
 * Primary Key:
 * - Combines the `id_technician`, `id_equipment`, and `date` columns to uniquely identify a maintenance record.
 */
export const maintenance = pgTable(
  'maintenance',
  {
    id_technician: uuid('id_technician')
      .notNull()
      .references(() => technician.id_user),
    id_equipment: uuid('id_equipment')
      .notNull()
      .references(() => equipment.id),
    date: timestamp('date', { mode: 'string' }).notNull().defaultNow(),
    type: type().notNull(),
    cost: real('cost').notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id_technician, table.id_equipment, table.date]
      })
    };
  }
);

/**
 * Represents the structure of a Maintenance entity as inferred by the database schema.
 *
 * This type is derived from `maintenance.$inferSelect` and is used for type definition
 * to ensure consistency when working with the underlying Maintenance model.
 *
 * It is typically utilized to define the shape of data retrieved from or inserted into
 * the Maintenance table, providing a typed interface for the entity's properties.
 */
export type Maintenance = typeof maintenance.$inferSelect;

/**
 * Represents the structure for a new maintenance record insertion.
 *
 * This type is derived from the inferred insert type of the `maintenance` object,
 * providing the expected shape and fields for creating a new entry in the maintenance system.
 *
 * Typically used when defining the data input for adding maintenance records to ensure
 * type safety and consistency with the database schema.
 */
export type NewMaintenance = typeof maintenance.$inferInsert;
