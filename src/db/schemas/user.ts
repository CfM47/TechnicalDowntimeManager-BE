import { pgTable,uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable("user", {
  id : uuid('id').primaryKey().defaultRandom(),
  name : varchar('username' , {length: 255}).notNull(),
  id_department : uuid('id_department').notNull(),//.references('department', 'id'),
  id_role : uuid('id_role').notNull(),//.references('role', 'id'),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;