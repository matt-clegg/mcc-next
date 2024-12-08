import { z } from "zod";
import { eq, getTableColumns, isNull } from "drizzle-orm";

export default eventHandler( async ( event ) => {
  const { folder, type, showFolders } = await getValidatedQuery( event, z.object( {
    folder: z.string().optional(),
    type: z.string().optional(),
    showFolders: z.enum( ["true", "false"] ).optional(),
  } ).parse );

  const { path, owner, ...rest } = getTableColumns( tables.assets );

  const relations = {
    owner: {
      table: tables.users,
      on: eq( tables.assets.owner, tables.users.id ),
    },
  };

  const fields = [...Object.keys( rest ), "owner.id", "owner.firstName", "owner.lastName"];

  const query = withColumns( useDrizzle(), tables.assets, fields, relations );

  // withPagination(query, page, limit);
  if ( type ) {
    if ( type === "image" ) {
      query.where( eq( tables.assets.isImage, true ) );
    } else if ( type === "files" ) {
      query.where( eq( tables.assets.isImage, false ) );
    } else {
      query.where( eq( tables.assets.mimeType, type ) );
    }
  }

  if ( folder ) {
    query.where( eq( tables.assets.folder, folder ) );
  }

  // if (sort) {
  //   withSort(query, sort, {
  //     name: tables.assets.filename,
  //     date: tables.assets.createdAt
  //   });
  // }

  const result = await query.execute();

  const assets = mapRelations( result );

  let folders: Folder[] = [];
  const paths: string[] = [];

  if ( showFolders && showFolders === "true" ) {
    if ( folder ) {
      folders = await useDrizzle()
      .select()
      .from( tables.folders )
      .where( eq( tables.folders.parent, folder ) );
    } else {
      folders = await useDrizzle()
      .select()
      .from( tables.folders )
      .where( isNull( tables.folders.parent ) );
    }
  }

  return {
    assets,
    folders,
    paths,
  };
} );
