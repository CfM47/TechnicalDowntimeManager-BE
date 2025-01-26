import { pgTable, uuid, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { Roles } from '../../enums';

export const roles = pgEnum('userRole', Roles);

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  id_department: uuid('id_department')
    .references(() => department.id)
    .notNull(),
  role: roles().notNull(),
  token: varchar('token')
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
