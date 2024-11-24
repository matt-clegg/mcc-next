import { eq } from "drizzle-orm";

export default eventHandler((event) => {
  const slug = getRouterParam(event, "slug")!;

  return useDrizzle()
    .select()
    .from(tables.redirects)
    .where(eq(tables.redirects.from, slug))
    .get();
});
