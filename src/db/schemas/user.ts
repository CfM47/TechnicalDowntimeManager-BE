import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { department } from './department';
import { role } from './role';

export const user = pgTable("user", {
  id : uuid('id').primaryKey().defaultRandom(),
  name : varchar('name' , {length: 255}).notNull(),
  password : varchar('password' , {length: 255}).notNull(),
  id_department : uuid('id_department').notNull().references(() => department.id),
  id_role : serial('id_role').references(() => role.id).notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;