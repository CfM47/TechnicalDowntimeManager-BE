import { pgTable, uuid, timestamp, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { TransferStatuses } from '../../enums';

/**
 * Defines the schema for the transfer table.
 *
 * Fields:
 * - id_sender: UUID of the sender, references the user table.
 * - id_receiver: UUID of the receiver, references the user table.
 * - id_equipment: UUID of the equipment, references the equipment table.
 * - date: Timestamp of the transfer, defaults to the current time.
 * - id_origin_dep: UUID of the origin department, references the department table.
 * - id_receiver_dep: UUID of the receiver department, references the department table.
 * - status: Enum representing the status of the transfer.
 *
 * Primary Key:
 * - Composite key consisting of id_sender, id_receiver, id_equipment, date, id_origin_dep, and id_receiver_dep.
 */
export const status = pgEnum('statuses', TransferStatuses);

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

export type Transfer = typeof transfer.$inferSelect;
export type NewTransfer = typeof transfer.$inferInsert;