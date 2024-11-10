import { defineConfig } from "drizzle-kit";
import env from "./shared/utils/env";

export default defineConfig({
  dialect: "sqlite",
  schema: "./server/database/schema/index.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: env.DB_FILE_NAME
  },
  casing: "snake_case"
});

// export default defineConfig({
//   dialect: "turso",
//   schema: "./server/database/schema/index.ts",
//   out: "./server/database/migrations",
//   dbCredentials: {
//     url: env.TURSO_DATABASE_URL,
//     authToken: env.TURSO_AUTH_TOKEN
//   },
//   casing: "snake_case"
// });
