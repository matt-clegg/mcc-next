import * as schema from "../schema";
import eventTypes from "./data/event-types.json";
import type { Database } from "~~/server/utils/drizzle";

export default async function seed(db: Database) {
  await db
    .insert(schema.eventTypes)
    .values(eventTypes);
}
