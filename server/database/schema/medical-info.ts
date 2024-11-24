import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import users from "./users";

export const medicalInfo = sqliteTable("medical_info", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  data: text("data").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  updatedAt: text("updated_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`).$onUpdateFn(() => sql`datetime(current_timestamp)`)
});

export const medicalInfoRelations = relations(medicalInfo, ({ one }) => ({
  user: one(users, {
    fields: [medicalInfo.user],
    references: [users.id]
  })
}));

export default medicalInfo;
