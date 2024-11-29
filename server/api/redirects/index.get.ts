import { eq } from "drizzle-orm";
import { z } from "zod";

export default eventHandler(async (event) => {
  const { path } = await getValidatedQuery(event, z.object({
    path: z.string()
  }).parse);

  return useDrizzle()
    .select()
    .from(tables.redirects)
    .where(eq(tables.redirects.from, path))
    .get();
});
