import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { role } from '../Role/schema';
import { resource } from '../Resources/schema';

export const roleResource = pgTable('role_resource', {
  role_id: uuid('role_id')
    .notNull()
    .references(() => role.id),
  resource_id: uuid('resource_id')
    .notNull()
    .references(() => resource.id)
});

export type RoleResource = typeof roleResource.$inferSelect;
export type NewRoleResource = typeof roleResource.$inferInsert;
