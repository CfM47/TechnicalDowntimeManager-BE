import { integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { user } from '../User/schema';

/**
 * Represents the `rate` table schema.
 *
 * This table is used to store rating information.
 *
 * Columns:
 * - `id_technician`: Unique identifier for the technician being rated. Cannot be null and references the `id_user` column in the `technician` table.
 * - `id_user`: Unique identifier for the user providing the rating. Cannot be null and references the `id` column in the `user` table.
 * - `date`: The timestamp of when the rating was provided. Cannot be null and defaults to the current timestamp.
 * - `comment`: A textual comment associated with the rating. Cannot be null and has a maximum length of 255 characters.
 * - `score`: An integer representing the rating score. Cannot be null.
 *
 * Constraints:
 * - The primary key consists of the `id_technician`, `id_user`, and `date` columns.
 */
export const rate = pgTable(
  'rate',
  {
    id_technician: uuid('id_technician')
      .notNull()
      .references(() => technician.id_user),
    id_user: uuid('id_user')
      .notNull()
      .references(() => user.id),
    date: timestamp('date', { mode: 'string' }).notNull().defaultNow(),
    comment: varchar('comment', { length: 255 }).notNull(),
    score: integer('score').notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id_technician, table.id_user, table.date]
      })
    };
  }
);

/**
 * The `Rate` type represents the inferred selected value from the `rate` object.
 * This is dynamically derived based on the `rate` object's structure and selection logic.
 * It allows for defining and ensuring type consistency when interacting with the rate object.
 */
export type Rate = typeof rate.$inferSelect;
/**
 * Represents a new rate model derived from the inferred type of `rate.$inferInsert`.
 * This type is typically used to define or enforce the structure for inserting new rate entries.
 */
export type NewRate = typeof rate.$inferInsert;
