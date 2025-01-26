import { pgTable, uuid, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { Roles } from '../../enums';

export const roles = pgEnum('userRole', Roles);

/**
 * Defines the roles enum and the user table schema.
 *
 * The `roles` enum represents the possible roles a user can have.
 * The `user` table schema includes fields for user ID, name, password,
 * department ID, role, and token.
 *
 * Types:
 * - `User`: Represents a selected user record.
 * - `NewUser`: Represents a new user record to be inserted.
 */

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
