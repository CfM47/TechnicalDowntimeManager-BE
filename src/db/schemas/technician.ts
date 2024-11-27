import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from './user';

export const technician = pgTable('technician', {
  id_user: uuid('id_user')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  exp_years: integer('exp_years').notNull(),
  specialty: varchar('specialty', { length: 255 }).notNull()
});

export type Technician = typeof technician.$inferSelect;
export type NewTechnician = typeof technician.$inferInsert;
