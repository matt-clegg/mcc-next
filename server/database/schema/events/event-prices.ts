import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { roles } from "../roles";
import { useHash } from "../../../../shared/utils/hash";
import events from "./events";

export const eventPrices = sqliteTable("event_prices", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  event: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  role: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  price: integer("price").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const eventPriceRelations = relations(eventPrices, ({ one }) => ({
  event: one(events, {
    fields: [eventPrices.event],
    references: [events.id]
  }),
  role: one(roles, {
    fields: [eventPrices.role],
    references: [roles.id]
  })
}));

export default eventPrices;
