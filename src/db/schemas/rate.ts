import { integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { technician } from './technician';
import { user } from './user';

export const rate = pgTable(
  'rate',
  {
    id_technician: uuid('id_technician').references(() => technician.id_user),
    id_user: uuid('id_user').references(() => user.id),
    date: timestamp('date').defaultNow(),
    comment: varchar('comment', { length: 255 }).notNull(),
    score: integer('score').notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id_technician, table.id_user]
      })
    };
  }
);

export type Rate = typeof rate.$inferSelect;
export type NewRate = typeof rate.$inferInsert;
