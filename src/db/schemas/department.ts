import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id_department: uuid("id_department").primaryKey().notNull(),
  department_name : varchar({ length: 255 }).notNull()
});

export type Department = typeof department.$inferSelect;
export type NewDepartment = typeof department.$inferInsert;
