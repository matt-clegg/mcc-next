import { count } from "drizzle-orm";

export default eventHandler(async (event) => {
  // await requireUserSession(event);

  // TODO: Require admin

  const result: { count: number } | undefined = await useDrizzle()
    .select({ count: count() })
    .from(tables.users)
    .get();

  return result?.count ?? 0;
});
