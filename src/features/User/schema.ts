import { pgTable, uuid, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { department } from '../Department/schema';
import { Roles } from '../../enums';

/**
 * Enum representing the user roles in the application.
 *
 * This variable is used to define and manage the various roles
 * that a user can have within the system.
 *
 * The `userRole` enum contains a set of predefined roles, typically sourced
 * from the provided `Roles` object, that are essential for access control
 * and permission handling within the application.
 *
 * Values of the enum are typically tied to specific functionalities
 * or access levels in the application.
 *
 * Usage of this variable ensures consistent role management and
 * contributes to maintaining a structured permission system.
 */
export const roles = pgEnum('userRole', Roles);

/**
 * Defines the 'user' table with the following columns:
 * - `id`: A UUID primary key with a default random value.
 * - `name`: A non-null VARCHAR field with a maximum length of 255 characters, representing the user's name.
 * - `password`: A non-null VARCHAR field with a maximum length of 255 characters, representing the user's password.
 * - `id_department`: A non-null UUID field that references the `id` column of the `department` table.
 * - `role`: A non-null field specifying the user's role, using the roles() function.
 * - `token`: A VARCHAR field representing the user's token.
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

/**
 * Represents a User derived from the inferred type of a database record.
 *
 * This User type is based on the structure determined by the `$inferSelect` method,
 * typically used for querying and selecting user data in a TypeScript/ORM context.
 */
export type User = typeof user.$inferSelect;
/**
 * Represents a new user entity type for database insertion based on the structure
 * defined by the `user` schema and inferred from its insertable properties.
 *
 * The `NewUser` type is dynamically derived and includes the fields
 * that align with the database's requirements for creating a new user record.
 * It ensures type safety and consistency when inserting new user data.
 */
export type NewUser = typeof user.$inferInsert;
