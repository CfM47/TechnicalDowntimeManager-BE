import { integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { user } from '../User/schema';

/**
 * Defines the `rate` table schema.
 *
 * The `rate` table stores information about rates given by users to technicians.
 * Each rate is uniquely identified by a combination of `id_technician`, `id_user`, and `date`.
 *
 * Columns:
 * - `id_technician`: UUID of the technician being rated. References the `id_user` column in the `technician` table.
 * - `id_user`: UUID of the user who provided the rate. References the `id` column in the `user` table.
 * - `date`: Timestamp of when the rate was given. Defaults to the current timestamp.
 * - `comment`: A textual comment provided by the user. Maximum length is 255 characters.
 * - `score`: An integer score given by the user.
 *
 * Primary Key:
 * - Composite key consisting of `id_technician`, `id_user`, and `date`.
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

export type Rate = typeof rate.$inferSelect;
export type NewRate = typeof rate.$inferInsert;
