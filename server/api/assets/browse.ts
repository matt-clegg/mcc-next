import { z } from "zod";
import { eq, getTableColumns, isNull } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { folder } = await getValidatedQuery(event, z.object({
    folder: z.string().optional()
  }).parse);

  const { path, owner, ...rest } = getTableColumns(tables.assets);

  const relations = {
    owner: {
      table: tables.users,
      on: eq(tables.assets.owner, tables.users.id)
    }
  };

  const fields = [...Object.keys(rest), "owner.id", "owner.firstName", "owner.lastName"];

  const query = withColumns(useDrizzle(), tables.assets, fields, relations);

  // withPagination(query, page, limit);

  if (folder) {
    query.where(eq(tables.assets.folder, folder));
  }

  // if (sort) {
  //   withSort(query, sort, {
  //     name: tables.assets.filename,
  //     date: tables.assets.createdAt
  //   });
  // }

  const result = await query.execute();

  const assets = mapRelations(result);

  // const folders = await useDrizzle()
  //   .select()
  //   .from(tables.folders)
  //   .where(eq(tables.folders.parent, folder || null));

  let folders: Folder[];
  const paths: string[] = [];

  if (folder) {
    folders = await useDrizzle()
      .select()
      .from(tables.folders)
      .where(eq(tables.folders.parent, folder));

    // const currentFolder = await useDrizzle()
    //   .select({ path: tables.folders.path })
    //   .from(tables.folders)
    //   .where(eq(tables.folders.id, folder))
    //   .get();
    //
    // if (currentFolder) {
    //   currentPath += currentFolder.path;
    // }
  }
  else {
    folders = await useDrizzle()
      .select()
      .from(tables.folders)
      .where(isNull(tables.folders.parent));
  }

  return {
    assets,
    folders,
    paths
  };
});
