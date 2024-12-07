import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { useHash } from "../../../../shared/utils/hash";
import users from "../users";

export const eventTypes = sqliteTable("event-types", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  alias: text("alias").notNull(),
  color: text("color").notNull(),
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export default eventTypes;
