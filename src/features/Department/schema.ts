import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

/**
 * Represents the schema definition for the "department" table in the database.
 * This table contains the following columns:
 *
 * - id: A UUID serving as the primary key. It is non-nullable and gets a default random value if not provided.
 * - name: A string column with a maximum length of 255 characters. This field is non-nullable.
 */
export const department = pgTable('department', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 255 }).notNull()
});

/**
 * Represents the type definition for a Department.
 *
 * This type is inferred from the `department.$inferSelect` type, which dynamically constructs
 * the shape of the object based on the selection model defined by the data source.
 *
 * It is commonly used to represent the structure of a Department object returned
 * from a database or a similar data fetching layer.
 */
export type Department = typeof department.$inferSelect;
/**
 * Represents a new department entity for insertion. This type is typically derived
 * from the inference of database schemas or structures where a department is being inserted.
 * It is defined based on the structure of the provided `department` model.
 *
 * The type is used in scenarios where a new instance of a department is being created
 * and the system requires the input structure to align with this type definition.
 *
 * This ensures strong typing and validation of department data at the time of insertion
 * into the system or database.
 */
export type NewDepartment = typeof department.$inferInsert;
