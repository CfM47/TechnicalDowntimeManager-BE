import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { role } from '../Role/schema';

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  id_department: uuid('id_department')
    .references(() => department.id)
    .notNull(),
  id_role: serial('id_role')
    .references(() => role.id)
    .notNull(),
  token: varchar('token')
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
