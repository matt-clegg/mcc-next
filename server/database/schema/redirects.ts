import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

export const redirects = sqliteTable("redirects", {
  to: text("to").notNull(),
  from: text("from").notNull(),
  responseCode: integer("response_code").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString())
}, redirects => ({
  pk: primaryKey({ columns: [redirects.from, redirects.to] })
}));

export default redirects;
