import { eq } from "drizzle-orm";
import { z } from "zod";

export default eventHandler(async (event) => {
  const { page, limit } = await getPaginationQuery(event);

  const { folder, sort } = await getValidatedQuery(event, z.object({
    folder: z.string().optional(),
    sort: z.string().optional()
  }).parse);

  const query = useDrizzle()
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.isImage, true))
    .$dynamic();

  withPagination(query, page, limit);

  if (folder) {
    query.where(eq(tables.assets.folder, folder));
  }

  if (sort) {
    withSort(query, sort, {
      name: tables.assets.filename,
      date: tables.assets.createdAt
    });
  }

  return query;
});
