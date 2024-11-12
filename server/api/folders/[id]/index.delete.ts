import fs from "node:fs/promises";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);
  const id = getRouterParam(event, "id")!;

  const folder = await useDrizzle()
    .select()
    .from(tables.folders)
    .where(eq(tables.folders.id, id))
    .get();

  if (!folder) {
    throw createError({
      statusCode: 404,
      statusMessage: "Folder not found"
    });
  }

  // TODO: Add check to ensure the folder we are deleting is within the uploads directory?

  await fs.rm(folder.fullPath, { recursive: true, force: true });

  await useDrizzle()
    .delete(tables.folders)
    .where(eq(tables.folders.id, id));
});
