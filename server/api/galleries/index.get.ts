import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { slug } = await getValidatedQuery(event, z.object({
    slug: z.string()
  }).parse);

  const gallery = await useDrizzle()
    .select()
    .from(tables.galleries)
    .where(eq(tables.galleries.slug, slug))
    .get();

  if (!gallery) {
    throw createError({
      statusCode: 404,
      statusMessage: "Gallery not found"
    });
  }
});
