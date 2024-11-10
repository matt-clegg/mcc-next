import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { users } from "./users";

export const memberships = sqliteTable("memberships", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  membershipType: text("membership_type").notNull(),
  billingCycle: text("billing_cycle", { enum: ["monthly", "annually"] }).notNull(),
  startDate: text("start_date").notNull(),
  nextBillingDate: text("next_billing_date").notNull(),
  active: integer("status", { mode: "boolean" }).default(true)
});

export const membershipRelationships = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.user],
    references: [users.id]
  })
}));

export default memberships;
