import { eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export default eventHandler(async (event) => {
  const { page, limit } = await getPaginationQuery(event);

  const { folder, sort } = await getValidatedQuery(event, z.object({
    sort: z.string().optional(),
    folder: z.string().optional()
  }).parse);

  const { path, owner, ...rest } = getTableColumns(tables.assets);
  
  // const query = useDrizzle()
  //   .select({...rest})
  //   .from(tables.assets)
  //   .where(eq(tables.assets.isImage, true))
  //   .$dynamic();

  const relations = {
    owner: {
      table: tables.users,
      on: eq(tables.assets.owner, tables.users.id)
    }
  };
  
  const fields = [...Object.keys(rest), "owner.firstName", "owner.lastName"];

  const query = withColumns(useDrizzle(), tables.assets, fields, relations);

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

  const result = await query.execute();
  
  return mapRelations(result);
});
