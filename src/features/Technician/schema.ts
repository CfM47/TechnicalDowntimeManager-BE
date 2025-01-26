import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';

/**
 * Defines the schema for the `technician` table.
 *
 * The `technician` table includes the following columns:
 * - `id_user`: UUID, primary key, references the `id` column in the `user` table, with cascade delete.
 * - `exp_years`: Integer, not null, represents the years of experience.
 * - `specialty`: Varchar, not null, represents the technician's specialty with a maximum length of 255 characters.
 */
export const technician = pgTable('technician', {
  id_user: uuid('id_user')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  exp_years: integer('exp_years').notNull(),
  specialty: varchar('specialty', { length: 255 }).notNull()
});

/**
 * Type representing a selected `Technician` record.
 */
export type Technician = typeof technician.$inferSelect;

/**
 * Type representing a new `Technician` record for insertion.
 */
export type NewTechnician = typeof technician.$inferInsert;
