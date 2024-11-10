import { drizzle } from "drizzle-orm/libsql";
import env from "../../shared/utils/env";
import * as schema from "~~/server/database/schema";

export const tables = schema;

const db = drizzle(env.DB_FILE_NAME, {
  schema
});

//  drizzle({
//     connection: {
//         url: env.TURSO_DATABASE_URL,
//         authToken: env.TURSO_AUTH_TOKEN
//     },
//     schema
// });

export function useDrizzle() {
  return db;
}

export type Database = typeof db;
