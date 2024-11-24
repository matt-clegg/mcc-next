import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const path = getRouterParam(event, "path")!;

  const page = await useDrizzle()
    .select()
    .from(tables.pages)
    .where(eq(tables.pages.slug, path))
    .get();

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found"
    });
  }

  return page;
});
