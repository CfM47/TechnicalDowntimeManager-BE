import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const equipment = pgTable("equipment", {
  id : uuid("id").primaryKey().defaultRandom(),
  name : varchar("name", {length: 255}).notNull(),
  type : varchar("type", {length: 255}).notNull(),
  state : varchar("state", {length: 255}).notNull(),
  id_department : uuid("id_department").notNull(),//.references('department', 'id'),
  acquisition_date : timestamp("acquisition_date").defaultNow().notNull(),
});

export type Equipment = typeof equipment.$inferSelect;
export type NewEquipment = typeof equipment.$inferInsert;