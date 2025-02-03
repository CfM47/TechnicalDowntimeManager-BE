import { pgTable, uuid, timestamp, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { TransferStatuses } from '../../enums';

/**
 * Represents the current state or progress of an object or operation.
 *
 * The `status` variable is a PostgreSQL enum that defines a set of predefined constants
 * within the `statuses` category. It is used to enforce and manage a fixed set of
 * allowable statuses defined by the `TransferStatuses` enumeration.
 *
 * Typically used to represent the state transitions or labels associated with
 * a transfer-like operation or similar processes within the application.
 */
export const status = pgEnum('statuses', TransferStatuses);

/**
 * Represents the `transfer` table structure in the database.
 *
 * This table stores information about equipment transfers between departments, including sender, receiver,
 * equipment details, and transfer status.
 *
 * Table Columns:
 * - `id_sender`: UUID referencing the `id` column in the `user` table. Represents the user initiating the transfer. Cannot be null.
 * - `id_receiver`: UUID referencing the `id` column in the `user` table. Represents the user receiving the transfer. Cannot be null.
 * - `id_equipment`: UUID referencing the `id` column in the `equipment` table. Represents the equipment being transferred. Cannot be null.
 * - `date`: Timestamp representing the date of the transfer. Cannot be null and defaults to the current timestamp if not provided.
 * - `id_origin_dep`: UUID referencing the `id` column in the `department` table. Represents the originating department. Cannot be null.
 * - `id_receiver_dep`: UUID referencing the `id` column in the `department` table. Represents the receiving department. Cannot be null.
 * - `status`: Represents the status of the transfer. Cannot be null.
 *
 * Table Constraints:
 * - Primary Key: Encompasses the combination of `id_sender`, `id_receiver`, `id_equipment`, `date`, `id_origin_dep`, and `id_receiver_dep` for ensuring uniqueness.
 */
export const transfer = pgTable(
  'transfer',
  {
    id_sender: uuid('id_sender')
      .notNull()
      .references(() => user.id),
    id_receiver: uuid('id_receiver')
      .notNull()
      .references(() => user.id),
    id_equipment: uuid('id_equipment')
      .notNull()
      .references(() => equipment.id),
    date: timestamp('date', { mode: 'string' }).notNull().defaultNow(),
    id_origin_dep: uuid('id_origin_dep')
      .notNull()
      .references(() => department.id),
    id_receiver_dep: uuid('id_receiver_dep')
      .notNull()
      .references(() => department.id),
    status: status().notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [
          table.id_sender,
          table.id_receiver,
          table.id_equipment,
          table.date,
          table.id_origin_dep,
          table.id_receiver_dep
        ]
      })
    };
  }
);

/**
 * Represents a type definition for a Transfer, inferred from the select structure
 * of the `transfer` object. The exact structure and properties of the Transfer
 * type depend on the definition of `transfer.$inferSelect`.
 *
 * This type is typically used to model the expected shape of data for a transfer
 * operation within the application. It allows for type inference and ensures
 * that all properties conform to the structure of the `transfer` object.
 */
export type Transfer = typeof transfer.$inferSelect;
/**
 * Represents a new transfer based on the inferred insert type from the transfer schema.
 *
 * This type is derived from the transfer schema to ensure the structure
 * matches the expected input for creating or inserting transfer records.
 *
 * Use this type to validate or enforce the shape of data being passed
 * to operations or functions that handle new transfer creation.
 */
export type NewTransfer = typeof transfer.$inferInsert;
