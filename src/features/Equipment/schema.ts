import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { EquipmentStatuses, EquipmentTypes } from '../../enums';


/**
 * Defines the enums for equipment type and status.
 */
export const type = pgEnum('equipmentType', EquipmentTypes);
export const status = pgEnum('equipmentState', EquipmentStatuses);

/**
 * Defines the `equipment` table schema.
 */
export const equipment = pgTable('equipment', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  type: type().notNull(),
  status: status().notNull(),
  id_department: uuid('id_department')
    .notNull()
    .references(() => department.id),
  acquisition_date: timestamp('acquisition_date', { mode: 'string' }).defaultNow().notNull()
});

/**
 * Type definitions for selecting and inserting equipment records.
 */
export type Equipment = typeof equipment.$inferSelect;
export type NewEquipment = typeof equipment.$inferInsert;
