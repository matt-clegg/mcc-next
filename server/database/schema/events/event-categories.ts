import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { useHash } from "../../../../shared/utils/hash";
import { timestampColumns } from "../../../utils/database";
import users from "../users";

export const eventCategories = sqliteTable("event_categories", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  alias: text("alias").notNull(),
  color: text("color").notNull(),
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  ...timestampColumns
});

export default eventCategories;
