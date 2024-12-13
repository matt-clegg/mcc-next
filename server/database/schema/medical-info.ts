import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
import users from "./users";

export const medicalInfo = sqliteTable("medical_info", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  data: text("data").notNull(),
  ...timestampColumns
});

export const medicalInfoRelations = relations(medicalInfo, ({ one }) => ({
  user: one(users, {
    fields: [medicalInfo.user],
    references: [users.id]
  })
}));

export default medicalInfo;
