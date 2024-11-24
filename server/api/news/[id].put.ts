import { z } from "zod";
import { eq } from "drizzle-orm";
import slugify from "slugify";
import { json } from "~~/server/utils/zod";
import type { NewsInsert } from "~~/server/database/schema/news";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const id = getRouterParam(event, "id")!;
  const body = await readValidatedBody(event, z.object({
    title: z.string(),
    status: z.enum(["draft", "published"]),
    content: json()
  }).parse);

  const existing = await useDrizzle()
    .select()
    .from(tables.news)
    .where(eq(tables.news.id, id))
    .get();

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "News not found"
    });
  }

  const news: NewsInsert = {
    ...body,
    slug: slugify(body.title)
  };

  const updated = await useDrizzle()
    .update(tables.news)
    .set(news)
    .where(eq(tables.news.id, id))
    .returning()
    .get();

  const nitro = useNitroApp();
  await nitro.hooks.callHook("news:update", existing, updated);
});
