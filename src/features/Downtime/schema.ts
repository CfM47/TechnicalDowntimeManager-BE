import { pgTable, uuid, timestamp, varchar, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';
import { equipment } from '../Equipment/schema';
import { department } from '../Department/schema';
import { DowntimeStatuses } from '../../enums';

export const status = pgEnum('downtimeStatus', DowntimeStatuses);

export const downtime = pgTable(
  'downtime',
  {
    id_sender: uuid('id_sender')
      .notNull()
      .references(() => user.id),
    id_receiver: uuid('id_receiver')
      .notNull()
      .references(() => user.id),
    id_equipment: uuid('id_equipment')
      .notNull()
      .references(() => equipment.id),
    date: timestamp('date', { mode: 'string' }).notNull().defaultNow(),
    id_dep_receiver: uuid('id_dep_receiver')
      .notNull()
      .references(() => department.id),
    status: status().notNull(),
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
