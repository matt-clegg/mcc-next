import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { roles } from "../roles";
import events from "./events";

export const eventAllowedRoles = sqliteTable("event_allowed_roles", {
  event: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  role: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" })
}, eventAllowedRoles => ({
  pk: primaryKey({ columns: [eventAllowedRoles.event, eventAllowedRoles.role] })
}));

export const eventAllowedRolesRelations = relations(eventAllowedRoles, ({ one }) => ({
  event: one(events, {
    fields: [eventAllowedRoles.event],
    references: [events.id]
  }),
  role: one(roles, {
    fields: [eventAllowedRoles.role],
    references: [roles.id]
  })
}));

export default eventAllowedRoles;
