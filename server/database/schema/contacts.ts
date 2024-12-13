import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
import users from "./users";

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  contactNumber: text("contact_number").notNull(),
  ...timestampColumns
});

export const contactRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.user],
    references: [users.id]
  })
}));

export default contacts;
