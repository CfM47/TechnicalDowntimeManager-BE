import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { EquipmentStatuses, EquipmentTypes } from '../../enums';

/**
 * Represents an enumeration type for 'equipmentType' based on the provided EquipmentTypes.
 * This type can be used to define or enforce specific values for equipment type identifiers within the system.
 *
 * @typedef {pgEnum} equipmentType
 * @param {string} equipmentType - A specific value from the predefined EquipmentTypes enumeration.
 */
export const type = pgEnum('equipmentType', EquipmentTypes);
/**
 * Represents the status of equipment within the `equipmentState` enum.
 * The variable `status` is constructed using `pgEnum` and utilizes the predefined set
 * of statuses provided by `EquipmentStatuses`.
 *
 * This variable is intended to manage the operational states or conditions of equipment
 * in the application.
 *
 * @type {Enum}
 */
export const status = pgEnum('equipmentState', EquipmentStatuses);

/**
 * Represents the 'equipment' table in the database.
 *
 * The table is used to store information about various pieces of equipment, along with their relevant metadata.
 *
 * Fields:
 * - id: The unique identifier for the equipment. It is a primary key and is automatically generated as a random UUID.
 * - name: The name of the equipment. It is a non-null string with a maximum length of 255 characters.
 * - type: The type/category of the equipment. It is a non-null field.
 * - status: The current status of the equipment. It is a non-null field.
 * - id_department: A foreign key referencing the ID of the associated department in the 'department' table. It is a non-null UUID.
 * - acquisition_date: The timestamp indicating when the equipment was acquired. It defaults to the current timestamp and cannot be null.
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
 * Represents the structure of an equipment entity as defined in the database schema.
 * The `Equipment` type is inferred based on the structure of `equipment` and its `$inferSelect` method.
 * This allows for type-safe database queries and operations within the application.
 */
export type Equipment = typeof equipment.$inferSelect;
/**
 * Represents the structure of a new equipment object, typically used when inserting data into a database.
 * The type is derived from the inferred structure of an insert operation on the `equipment` entity.
 */
export type NewEquipment = typeof equipment.$inferInsert;
