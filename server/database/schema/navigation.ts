import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
import pages from "./pages";
import { roles } from "./roles";

export const navigation = sqliteTable("navigation", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  parentId: text("parentId").references((): AnySQLiteColumn => navigation.id, { onDelete: "set null" }),
  page: text("page_id").references(() => pages.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  order: integer("order").notNull(),
  ...timestampColumns
});

export const navigationRoles = sqliteTable("navigation_roles", {
  role: text("role_id").references(() => roles.id, { onDelete: "set null" }),
  navigation: text("navigation_id").references(() => navigation.id, { onDelete: "cascade" })
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

export const navigationRolesRelations = relations(navigationRoles, ({ one }) => ({
  role: one(roles, {
    fields: [navigationRoles.role],
    references: [roles.id]
  }),
  navigation: one(navigation, {
    fields: [navigationRoles.navigation],
    references: [navigation.id]
  })
}));
