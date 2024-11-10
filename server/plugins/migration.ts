import { migrate } from "drizzle-orm/libsql/migrator";

export default defineNitroPlugin(async () => {
  if (!env.DB_FILE_NAME.includes("test.db")) {
    return;
  }

  console.log("Running migrations...");
  await migrate(useDrizzle(), {
    migrationsFolder: "server/database/migrations"
  }).then(() => console.error("Migrations completed!"))
    .catch(err => console.error("Error running migrations", err));
});
