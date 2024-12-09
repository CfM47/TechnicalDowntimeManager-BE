import { pgTable, uuid, timestamp, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';

export const downtime = pgTable(
  'downtime',
  {
    id_sender: uuid('id_sender').references(() => user.id),
    id_receiver: uuid('id_receiver').references(() => user.id),
    id_equipment: uuid('id_equipment').references(() => equipment.id),
    date: timestamp('date', { mode: 'string' }).defaultNow(),
    id_dep_receiver: uuid('id_dep_receiver').references(() => department.id),
    status: varchar('status', { length: 255 }).notNull(), // Define as enum later
    cause: varchar('cause', { length: 255 }).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [
          table.id_sender,
          table.id_receiver,
          table.id_equipment,
          table.date,
          table.id_dep_receiver
        ]
      })
    };
  }
);

export type Downtime = typeof downtime.$inferSelect;
export type NewDowntime = typeof downtime.$inferInsert;
