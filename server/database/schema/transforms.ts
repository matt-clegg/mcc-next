import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
import assets from "./assets";

export const transforms = sqliteTable("transforms", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  originalAsset: text("original_id").notNull().references(() => assets.id),
  transformKey: text("transform_key").notNull(),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  mimeType: text("mime_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  format: text("format"),
  quality: integer("quality"),
  blur: integer("blur"),
  ...timestampColumns
});

export const transformsRelations = relations(transforms, ({ one }) => ({
  originalAsset: one(assets, {
    fields: [transforms.originalAsset],
    references: [assets.id]
  })
}));

export default transforms;
