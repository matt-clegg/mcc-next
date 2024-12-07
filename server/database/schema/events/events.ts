import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { useHash } from "../../../../shared/utils/hash";
import users from "../users";
import eventTypes from "./event-types";

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

  // Misc info
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
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()).$onUpdateFn(() => new Date().toISOString())
});

export default events;
