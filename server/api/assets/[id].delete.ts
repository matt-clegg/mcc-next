import fs from "node:fs";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);
  const id = getRouterParam(event, "id")!;

  const asset = await useDrizzle()
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.id, id))
    .get();

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: "Asset not found"
    });
  }

  const fsPromises = fs.promises;

  await fsPromises.rm(asset.path);

  await useDrizzle()
    .delete(tables.assets)
    .where(eq(tables.assets.id, id));

  const transforms = await useDrizzle()
    .select({ path: tables.transforms.path })
    .from(tables.transforms)
    .where(eq(tables.transforms.originalAsset, id));

  for (const transform of transforms) {
    await fsPromises.rm(transform.path);
  }

  await useDrizzle()
    .delete(tables.transforms)
    .where(eq(tables.transforms.originalAsset, id));
});
