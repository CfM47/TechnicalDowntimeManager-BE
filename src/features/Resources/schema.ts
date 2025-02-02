import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const resource = pgTable('resource', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull()
});

export type Resource = typeof resource.$inferSelect;
export type NewResource = typeof resource.$inferInsert;
