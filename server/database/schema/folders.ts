import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import folderPermissions from "./folder-permissions";

export const folders = sqliteTable("folders", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  path: text("path").notNull(),
  parent: text("parent_id").references((): AnySQLiteColumn => folders.id, { onDelete: "cascade" }),
  fullPath: text("full_path").notNull(),
  hidden: integer("hidden", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export type FolderSelect = typeof folders.$inferSelect;

export const foldersRelations = relations(folders, ({ many }) => ({
  permissions: many(folderPermissions)
}));

export default folders;
