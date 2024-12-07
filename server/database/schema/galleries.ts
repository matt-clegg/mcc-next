import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";

export const galleries = sqliteTable("galleries", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  name: text("name").notNull(),
  slug: text("path").notNull(),
  description: text("description"),
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
});

export const galleriesRelations = relations(galleries, ({ one }) => ({
  createdBy: one(users, {
    fields: [galleries.createdBy],
    references: [users.id]
  })
}));

export default galleries;
