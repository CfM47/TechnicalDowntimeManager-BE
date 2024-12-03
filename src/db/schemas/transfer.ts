import { pgTable, uuid, timestamp, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { user } from './user';
import { equipment } from './equipment';
import { department } from './department';

export const transfer = pgTable(
  'transfer',
  {
    id_sender: uuid('id_sender').references(() => user.id),
    id_receiver: uuid('id_receiver').references(() => user.id),
    id_equipment: uuid('id_equipment').references(() => equipment.id),
    date: timestamp('date',{mode : 'string'}).defaultNow(),
    id_origin_dep: uuid('id_origin_dep').references(() => department.id),
    id_receiver_dep: uuid('id_receiver_dep').references(() => department.id),
    downtime_status: varchar('downtime_status', { length: 255 }).notNull() //TODO Define as enum later
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [
          table.id_sender,
          table.id_receiver,
          table.id_equipment,
          table.date,
          table.id_origin_dep,
          table.id_receiver_dep
        ]
      })
    };
  }
);

export type Transfer = typeof transfer.$inferSelect;
export type NewTransfer = typeof transfer.$inferInsert;