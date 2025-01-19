import { integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { user } from '../User/schema';

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
