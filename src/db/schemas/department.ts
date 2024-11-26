import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull()
});

export type Department = typeof department.$inferSelect;
export type NewDepartment = typeof department.$inferInsert;
