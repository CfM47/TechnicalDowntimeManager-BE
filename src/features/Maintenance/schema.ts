import { pgTable, uuid, timestamp, real, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { equipment } from '../Equipment/schema';
import { MaintenanceTypes } from '../../enums';

/**
 * Defines the schema for the `maintenance` table.
 *
 * The `maintenance` table stores records of maintenance activities performed by technicians on equipment.
 * Each record includes the technician ID, equipment ID, date of maintenance, type of maintenance, and cost.
 * The primary key is a composite key consisting of `id_technician`, `id_equipment`, and `date`.
 */

export const type = pgEnum('maintenanceType', MaintenanceTypes);

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
 * Type representing a selected maintenance record.
 */
export type Maintenance = typeof maintenance.$inferSelect;

/**
 * Type representing a new maintenance record to be inserted.
 */
export type NewMaintenance = typeof maintenance.$inferInsert;
