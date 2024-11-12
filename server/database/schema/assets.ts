import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";
import folders from "./folders";
import transforms from "./transforms";

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  mimeType: text("mimetype").notNull(),
  size: integer("size").notNull(),
  owner: text("owner_id").notNull().references(() => users.id, { onDelete: "set null" }),
  folder: text("folder_id").references(() => folders.id, { onDelete: "cascade" }),
  isImage: integer("is_image", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const assetsRelations = relations(assets, ({ one, many }) => ({
  owner: one(users, {
    fields: [assets.owner],
    references: [users.id]
  }),
  transforms: many(transforms),
  folder: one(folders, {
    fields: [assets.folder],
    references: [folders.id]
  })
}));

export default assets;
