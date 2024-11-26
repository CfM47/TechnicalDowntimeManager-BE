import { pgTable, uuid, timestamp, varchar, real, primaryKey } from 'drizzle-orm/pg-core';
import { technician } from './technician';
import { equipment } from './equipment';

export const maintenance = pgTable(
  'maintenance',
  {
    id_technician: uuid('id_technician').references(() => technician.id_user),
    id_equipment: uuid('id_equipment').references(() => equipment.id),
    date: timestamp('date').notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    cost: real('cost').notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id_technician, table.id_equipment, table.date]
      })
    };
  }
);

export type Maintenance = typeof maintenance.$inferSelect;
export type NewMaintenance = typeof maintenance.$inferInsert;
