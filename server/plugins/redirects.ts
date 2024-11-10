import { and, eq } from "drizzle-orm";
import type { News } from "~~/server/database/schema/news";

async function createRedirect(oldUrl: string, newUrl: string, responseCode: number) {
  if (oldUrl === newUrl) {
    return;
  }

  const existing = await useDrizzle()
    .select()
    .from(tables.redirects)
    .where(and(eq(tables.redirects.from, oldUrl), eq(tables.redirects.to, newUrl)))
    .get();

  if (existing) {
    console.log("Redirect already exists");
    return;
  }

  const matching = await useDrizzle()
    .select()
    .from(tables.redirects)
    .where(eq(tables.redirects.to, oldUrl))
    .get();

  if (matching) {
    if (matching.from === newUrl) {
      await useDrizzle()
        .delete(tables.redirects)
        .where(and(eq(tables.redirects.from, newUrl), eq(tables.redirects.to, oldUrl)));
    }
    else {
      await useDrizzle()
        .update(tables.redirects)
        .set({
          to: newUrl
        })
        .where(and(eq(tables.redirects.from, newUrl), eq(tables.redirects.to, oldUrl)));
    }
  }

  await useDrizzle()
    .insert(tables.redirects)
    .values({
      from: oldUrl,
      to: newUrl,
      responseCode
    });

  console.log(`created redirect: ${oldUrl} -> ${newUrl}`);
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("news:update", async (oldNews: News, newNews: News) => {
    console.log("news updated", oldNews, newNews);

    const oldUrl = `/news/${oldNews.id}/${oldNews.slug}`;
    const newUrl = `/news/${newNews.id}/${newNews.slug}`;

    await createRedirect(oldUrl, newUrl, 301);
  });
});
