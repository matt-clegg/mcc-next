import { z } from "zod";
import slugify from "slugify";
import { json } from "~~/server/utils/zod";
import type { NewsInsert } from "~~/server/database/schema/news";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readValidatedBody(event, z.object({
    title: z.string(),
    content: json(),
    status: z.enum(["draft", "published"])
  }).parse);

  const news: NewsInsert = {
    ...body,
    slug: slugify(body.title),
    author: user.id
  };

  await useDrizzle()
    .insert(tables.news)
    .values(news);
});
