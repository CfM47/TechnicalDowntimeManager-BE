import { pgTable, uuid, timestamp, real, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { technician } from '../Technician/schema';
import { equipment } from '../Equipment/schema';
import { MaintenanceTypes } from '../../enums';

const type = pgEnum('maintenanceType', MaintenanceTypes);

export const maintenance = pgTable(
  'maintenance',
  {
    id_technician: uuid('id_technician')
      .notNull()
      .references(() => technician.id_user),
    id_equipment: uuid('id_equipment')
      .notNull()
      .references(() => equipment.id),
    date: timestamp('date', { mode: 'string' }).notNull().defaultNow(),
    type: type().notNull(),
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
