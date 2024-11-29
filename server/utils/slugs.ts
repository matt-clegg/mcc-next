import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm";
import type { Database } from "~~/server/utils/drizzle";

export async function getUniqueSlug(title: string, collection: SQLiteTable) {
  const baseSlug = slugify(title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await useDrizzle()
      .select()
      .from(collection)
      .where(eq(collection.slug, uniqueSlug))
      .get();

    if (!existing) {
      break;
    }

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
