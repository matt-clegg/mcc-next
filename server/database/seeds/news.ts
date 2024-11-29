import { faker } from "@faker-js/faker";
import { eq, sql } from "drizzle-orm";
import * as schema from "../schema";
import type { Database } from "~~/server/utils/drizzle";
import { slugify } from "~~/shared/utils/strings";

export default async function seed(db: Database) {
  for (let i = 0; i < 48; i++) {
    const title = faker.book.title();

    const baseSlug = slugify(title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await db
        .select()
        .from(schema.news)
        .where(eq(schema.news.slug, uniqueSlug))
        .get();

      if (!existing) {
        break;
      }

      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    let content = "";

    const paragraphs = Math.ceil((Math.random() + 3) * 7);
    for (let j = 0; j < paragraphs; j++) {
      content += `<p>${faker.lorem.paragraph()}</p>`;
    }

    const user = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .get();

    await db
      .insert(schema.news)
      .values({
        title,
        slug: uniqueSlug,
        content,
        status: "published",
        createdBy: user!.id,
        createdAt: faker.date.past().toISOString()
      });
  }
}
