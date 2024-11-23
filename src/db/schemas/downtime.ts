import { pgTable, uuid, timestamp, varchar, primaryKey } from "drizzle-orm/pg-core";

export const downtime = pgTable("downtime", {
  id_sender: uuid("id_sender").notNull().defaultRandom(),  // Add foreign key to User
  id_receiver: uuid("id_receiver").notNull().defaultRandom(),  // Add foreign key to User
  id_equipment: uuid("id_equipment").notNull().defaultRandom(),  // Add foreign key to Equipment
  downtime_date: timestamp("downtime_date").notNull(),
  id_dep_receiver: uuid("id_dep_receiver").notNull().defaultRandom(),  // Add foreign key to Department
  downtime_status: varchar("downtime_status", { length: 255 }).notNull(),  // Define as enum later
  cause: varchar("cause", { length: 255 }).notNull()
}, (table) => {
  return {
    pk: primaryKey(
      table.id_sender,
      table.id_receiver,
      table.id_equipment,
      table.downtime_date,
      table.id_dep_receiver
    )
  };
});

export type Downtime = typeof downtime.$inferSelect;
export type NewDowntime = typeof downtime.$inferInsert;