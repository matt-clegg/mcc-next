import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  title: text("name").notNull(),
  slug: text("path").notNull(),
  url: text("path").notNull(),
  blocks: text("blocks", { mode: "json" }).notNull(),
  parent: text("parent_id").references((): AnySQLiteColumn => pages.id, { onDelete: "set null" }),
  ...timestampColumns
});

export const pagesRelations = relations(pages, ({ one }) => ({
  parent: one(pages, {
    fields: [pages.parent],
    references: [pages.id]
  })
}));

export default pages;
