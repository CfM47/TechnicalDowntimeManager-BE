import { pgTable, uuid, timestamp, varchar, primaryKey } from "drizzle-orm/pg-core";

export const transfer = pgTable("transfer", {
  id_sender: uuid("id_sender").notNull().defaultRandom(),  // Add foreign key to User
  id_receiver: uuid("id_receiver").notNull().defaultRandom(),  // Add foreign key to User
  id_equipment: uuid("id_equipment").notNull().defaultRandom(),  // Add foreign key to Equipment
  transfer_date: timestamp("transfer_date").notNull(),
  id_origin_dep: uuid("id_origin_dep").notNull().defaultRandom(),  // Add foreign key to Department
  id_receiver_dep: uuid("id_receiver_dep").notNull().defaultRandom(),  // Add foreign key to Department
  downtime_status: varchar("downtime_status", { length: 255 }).notNull()  // Define as enum later
}, (table) => {
  return {
    pk: primaryKey(
      table.id_sender,
      table.id_receiver,
      table.id_equipment,
      table.transfer_date,
      table.id_origin_dep,
      table.id_receiver_dep
    )
  };
});

export type Transfer = typeof transfer.$inferSelect;
export type NewTransfer = typeof transfer.$inferInsert;