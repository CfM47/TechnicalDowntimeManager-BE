import { pgTable, uuid, timestamp, varchar, real, primaryKey } from "drizzle-orm/pg-core";

export const maintenance = pgTable("maintenance", {
  id_technician: uuid("id_technician").notNull().defaultRandom(),  //Add foreign key to Technician
  id_equipment: uuid("id_equipment").notNull().defaultRandom(),    //Add foreign key to Equipment
  maintenance_date: timestamp("maintenance_date").notNull(),
  maintenance_type: varchar("maintenance_type", { length: 255 }).notNull(),
  cost: real("cost").notNull()
}, (table) => {
  return {
    pk: primaryKey(table.id_technician, table.id_equipment, table.maintenance_date)
  };
});

export type Maintenance = typeof maintenance.$inferSelect;
export type NewMaintenance = typeof maintenance.$inferInsert;