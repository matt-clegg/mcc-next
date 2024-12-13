import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
import users from "./users";

export const folders = sqliteTable("payments", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").notNull().references(() => users.id, { onDelete: "set null" }),
  stripePaymentId: text("stripe_payment_id").notNull(),
  totalAmount: integer("total_amount").notNull(),
  paymentType: text("payment_type").notNull(),
  status: text("status", { enum: ["pending", "paid", "failed"] }).notNull(),
  ...timestampColumns
});
