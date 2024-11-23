import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { rate } from './rate';

export const role = pgTable('role', {
  id_role: uuid("id_role").primaryKey(),
  role_name : varchar({ length: 255 }).notNull()
});

export type Role = typeof role.$inferSelect;
export type NewRole = typeof rate.$inferInsert;

