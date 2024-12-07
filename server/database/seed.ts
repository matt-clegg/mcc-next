import * as seeds from "./seeds";
import { useDrizzle } from "~~/server/utils/drizzle";

const db = useDrizzle();

await seeds.roles(db);
await seeds.users(db);
await seeds.news(db);
await seeds.events(db);
