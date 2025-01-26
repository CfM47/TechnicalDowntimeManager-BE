import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

/**
 * Defines the schema for the `department` table.
 *
 * The table includes the following columns:
 * - `id`: A UUID that serves as the primary key, with a default random value.
 * - `name`: A varchar field with a maximum length of 255 characters, which cannot be null.
 */
export const department = pgTable('department', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull()
});

export type Department = typeof department.$inferSelect;
export type NewDepartment = typeof department.$inferInsert;
