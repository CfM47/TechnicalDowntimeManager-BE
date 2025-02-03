import { pgTable, uuid, timestamp, varchar, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { DowntimeStatuses } from '../../enums';

/**
 * Represents the enumeration status for downtime states, utilizing the provided `downtimeStatus` key and `DowntimeStatuses` object.
 *
 * This variable is used to define and manage specific downtime statuses in the application by creating a typed and standardized set of enum values.
 *
 * It ensures that only predefined statuses from `DowntimeStatuses` may be used, enhancing maintainability and reducing potential errors.
 */
export const status = pgEnum('downtimeStatus', DowntimeStatuses);

/**
 * Represents the 'downtime' table schema.
 *
 * The downtime table keeps a record of equipment downtime incidents, along with metadata
 * about the sender, receiver, equipment involved, the affected department, time of the event,
 * current status, and cause of downtime.
 *
 * Table Columns:
 * - id_sender: A UUID representing the sender's user id. This value is non-nullable and references the 'id' column of the user table.
 * - id_receiver: A UUID representing the receiver's user id. This value is non-nullable and references the 'id' column of the user table.
 * - id_equipment: A UUID identifying the specific equipment involved in the downtime. This value is non-nullable and references the 'id' column of the equipment table.
 * - date: A timestamp indicating the date and time of the downtime. Its format is a string, it is non-nullable, and has a default value of the current time.
 * - id_dep_receiver: A UUID identifying the department that received the downtime report. This value is non-nullable and references the 'id' column of the department table.
 * - status: Represents the current status of the downtime incident. This column is non-nullable.
 * - cause: A string (maximum 255 characters) describing the cause of the downtime. This value is non-nullable.
 *
 * Primary Key:
 * The primary key for this table is a composite key consisting of the following columns:
 * - id_sender
 * - id_receiver
 * - id_equipment
 * - date
 * - id_dep_receiver
 */
export const downtime = pgTable(
  'downtime',
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
    id_dep_receiver: uuid('id_dep_receiver')
      .notNull()
      .references(() => department.id),
    status: status().notNull(),
    cause: varchar('cause', { length: 255 }).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [
          table.id_sender,
          table.id_receiver,
          table.id_equipment,
          table.date,
          table.id_dep_receiver
        ]
      })
    };
  }
);

/**
 * Represents the type definition for a Downtime, inferred from the schema or structure
 * defined by the `downtime` object. This type is dynamically generated and reflects the
 * inferred shape of the selected properties or data within the `downtime` object.
 */
export type Downtime = typeof downtime.$inferSelect;

/**
 * Represents a type definition for creating a new downtime record, inferred from
 * the schema or validation logic of the downtime module using the `$inferInsert` property.
 * This type is typically used to define the structure of the data required
 * when creating a new downtime instance in the application.
 */
export type NewDowntime = typeof downtime.$inferInsert;
