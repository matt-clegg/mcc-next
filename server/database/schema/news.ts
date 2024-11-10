import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";

export const news = sqliteTable("news", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  title: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content", { mode: "json" }),
  author: text("author").references(() => users.id, { onDelete: "set null" }),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  createdAt: text("created_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  updatedAt: text("updated_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`).$onUpdateFn(() => sql`datetime(current_timestamp)`)
});

export type News = typeof news.$inferSelect;
export type NewsInsert = typeof news.$inferInsert;

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.author],
    references: [users.id]
  })
}));

export default news;
