import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const emailTemplates = sqliteTable("email_templates", {
  name: text("name").primaryKey(),
  content: text("token").notNull()
});

export default emailTemplates;
