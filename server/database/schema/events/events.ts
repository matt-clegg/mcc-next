import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../../shared/utils/hash";
import { timestampColumns } from "../../../utils/database";
import users from "../users";
import eventTypes from "./event-types";
import eventPrices from "./event-prices";
import eventAllowedRoles from "./event-allowed-roles";
import eventBookings from "./event-bookings";

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),

  // Key info
  status: text("status", { enum: ["draft", "published", "cancelled"] }).notNull().default("draft"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  type: text("type").notNull().references(() => eventTypes.id),
  occurrenceType: text("occurrence_type", { enum: ["single", "multi", "recurring"] }).notNull(),
  maxSpaces: integer("max_spaces"),

  parent: text("parent_id").references((): AnySQLiteColumn => events.id, { onDelete: "cascade" }),

  // Misc info
  bookingAllowed: integer("booking_allowed", { mode: "boolean" }).notNull(),
  attendeesVisible: integer("attendees_visible", { mode: "boolean" }).notNull(),
  allowBookingsAfterStart: integer("allow_bookings_after_start", { mode: "boolean" }).notNull(),
  lastBookingDate: integer("last_booking_date", { mode: "timestamp" }),
  minAge: integer("min_age"),

  // Dates
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }),
  rrule: text("rrule"),

  // Meta
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  ...timestampColumns
});

export const eventRelations = relations(events, ({ one, many }) => ({
  type: one(eventTypes, {
    fields: [events.type],
    references: [eventTypes.id]
  }),
  parent: one(events, {
    fields: [events.parent],
    references: [events.id]
  }),
  createdBy: one(users, {
    fields: [events.createdBy],
    references: [users.id]
  }),
  prices: many(eventPrices),
  allowedRoles: many(eventAllowedRoles),
  bookings: many(eventBookings)
}));

export default events;

export type EventInsert = typeof events.$inferInsert;
