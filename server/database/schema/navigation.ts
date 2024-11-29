import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import pages from "./pages";

export const navigation = sqliteTable("navigation", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  parentId: text("parentId").references((): AnySQLiteColumn => navigation.id, { onDelete: "set null" }),
  page: text("page_id").references(() => pages.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  order: integer("order").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const navigationRelations = relations(navigation, ({ one }) => ({
  parentId: one(navigation, {
    fields: [navigation.parentId],
    references: [navigation.id],
    relationName: "navigationParent"
  }),
  page: one(pages, {
    fields: [navigation.page],
    references: [pages.id]
  })
}));

export default navigation;
