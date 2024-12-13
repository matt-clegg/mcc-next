import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { timestampColumns } from "../../utils/database";

export const redirects = sqliteTable("redirects", {
  to: text("to").notNull(),
  from: text("from").notNull(),
  responseCode: integer("response_code").notNull(),
  ...timestampColumns
}, redirects => ({
  pk: primaryKey({ columns: [redirects.from, redirects.to] })
}));

export default redirects;
