import { eq } from "drizzle-orm";
import { z } from "zod";

export default eventHandler(async (event) => {
  const { slug } = await getValidatedQuery(event, z.object({
    slug: z.string().optional()
  }).parse);

  if (slug) {
    // TODO: Caching
    return useDrizzle()
      .select()
      .from(tables.redirects)
      .where(eq(tables.redirects.from, slug));
  }

  return useDrizzle()
    .select()
    .from(tables.redirects);
});
