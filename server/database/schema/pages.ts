import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  title: text("name").notNull(),
  slug: text("path").notNull(),
  url: text("path").notNull(),
  blocks: text("blocks", { mode: "json" }).notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const pagesRelations = relations(pages, () => ({}));

export default pages;
