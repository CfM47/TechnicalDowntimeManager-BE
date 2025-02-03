import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from '../User/schema';

/**
 * Represents the database table `technician` with its associated fields and constraints.
 *
 * Fields:
 * - `id_user`: A UUID field serving as the primary key, referencing the `id` field of the `user` table.
 *              Includes a cascade delete operation when the referenced user is deleted.
 * - `exp_years`: An integer field representing the number of years of experience of the technician.
 *                This field cannot be null.
 * - `specialty`: A varchar field representing the specialty of the technician,
 *                with a maximum length of 255 characters. This field cannot be null.
 *
 * This table is used to store information about technicians, their user account references,
 * years of experience, and areas of specialization.
 */
export const technician = pgTable('technician', {
  id_user: uuid('id_user')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  exp_years: integer('exp_years').notNull(),
  specialty: varchar('specialty', { length: 255 }).notNull()
});

/**
 * Represents a Technician type, inferred from the database model using the `$inferSelect` method.
 *
 * This type reflects the shape of data selected from the database for a Technician entity.
 * It is designed to provide type safety and ensure consistent use of Technician-related data
 * when working with the application.
 *
 * The `$inferSelect` utility is used to generate this type dynamically based on the schema
 * definition provided in the database layer, ensuring that the type matches the database structure.
 */
export type Technician = typeof technician.$inferSelect;

/**
 * Represents a new technician entry based on the inferred type from the technician's insert operation.
 *
 * The `NewTechnician` type is derived from the database schema or model definition of a technician,
 * specifically from the inferred type structure of an insert operation using the `$inferInsert` property.
 *
 * This type captures the expected fields and data requirements for creating a new technician in the system.
 */
export type NewTechnician = typeof technician.$inferInsert;
