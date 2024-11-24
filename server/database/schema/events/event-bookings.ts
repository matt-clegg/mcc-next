import { sqliteTable, text, integer, unique, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import users from "../users";
import { useHash } from "../../../../shared/utils/hash";
import events from "./events";

export const eventBookings = sqliteTable("event_bookings", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").notNull().references(() => users.id, { onDelete: "set null" }),
  event: text("event_id").notNull().references(() => events.id, { onDelete: "set null" }),
  instance: integer("instance"),
  status: text("status", { enum: ["booked", "cancelled"] }).notNull(),
  cancelledAt: text("cancelled_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
}, eventBookings => ({
  unique: unique().on(eventBookings.user, eventBookings.event),
  eventIdx: index("ix_event_bookings_event_id").on(eventBookings.event),
  userIdx: index("ix_event_bookings_user_id").on(eventBookings.user)
}));

export const eventBookingsRelations = relations(eventBookings, ({ one }) => ({
  user: one(users, {
    fields: [eventBookings.user],
    references: [users.id]
  }),
  event: one(events, {
    fields: [eventBookings.event],
    references: [events.id]
  })
}));

export default eventBookings;
