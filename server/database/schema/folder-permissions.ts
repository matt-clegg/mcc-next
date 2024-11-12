import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import folders from "./folders";
import users from "./users";
import { roles } from "./roles";

export const folderPermissions = sqliteTable("folder_permissions", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  folder: text("folder_id").notNull().references(() => folders.id, { onDelete: "cascade" }),
  user: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  role: text("role_id").references(() => roles.id, { onDelete: "cascade" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const folderPermissionRelations = relations(folderPermissions, ({ one }) => ({
  folder: one(folders, {
    fields: [folderPermissions.folder],
    references: [folders.id]
  }),
  user: one(users, {
    fields: [folderPermissions.user],
    references: [users.id]
  }),
  role: one(roles, {
    fields: [folderPermissions.role],
    references: [roles.id]
  })
}));

export default folderPermissions;
