import * as schema from "../schema";
import roles from "./data/roles.json";
import type { Database } from "~~/server/utils/drizzle";

export default async function seed(db: Database) {
  await db
    .insert(schema.roles)
    .values(roles);
}
