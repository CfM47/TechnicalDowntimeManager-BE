import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { rate } from './rate';

export const role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull()
});

export type Role = typeof role.$inferSelect;
export type NewRole = typeof rate.$inferInsert;
