import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  return useDrizzle()
    .select()
    .from(tables.folders)
    .where(eq(tables.folders.system, true));
});
