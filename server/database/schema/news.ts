import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";

export const news = sqliteTable("news", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  title: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content", { mode: "json" }),
  status: text("status", { enum: ["draft", "published", "scheduled"] }).notNull().default("draft"),
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  updatedAt: text("updated_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`).$onUpdateFn(() => sql`datetime(current_timestamp)`)
}, news => ({
  slugIdx: index("ix_news_slug").on(news.slug)
}));

export type News = typeof news.$inferSelect;
export type NewsInsert = typeof news.$inferInsert;

export const newsRelations = relations(news, ({ one }) => ({
  createdBy: one(users, {
    fields: [news.createdBy],
    references: [users.id]
  })
}));

export default news;
