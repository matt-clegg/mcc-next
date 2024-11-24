// List assets in folder
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  return useDrizzle()
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.folder, id));
});
