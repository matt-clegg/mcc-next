import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";
import transforms from "./transforms";

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  mimeType: text("mimetype").notNull(),
  size: integer("size").notNull(),
  uploader: text("uploader_user_id").notNull().references(() => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const assetsRelations = relations(assets, ({ one, many }) => ({
  uploader: one(users, {
    fields: [assets.uploader],
    references: [users.id]
  }),
  transforms: many(transforms)
}));

export default assets;
