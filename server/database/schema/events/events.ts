import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { useHash } from "../../../../shared/utils/hash";

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  type: text("type").notNull(),
  maxSpaces: integer("max_spaces"),
  createdAt: text("created_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  updatedAt: text("updated_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`).$onUpdateFn(() => sql`datetime(current_timestamp)`)
});

export default events;
