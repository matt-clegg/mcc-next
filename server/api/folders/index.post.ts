import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler( async ( event ) => {
  await requireUserSession( event );
  await authorize( event, canCreateFolder );

  const body = await readValidatedBody( event, z.object( {
    name: z.string(),
    path: z.string(),
    parent: z.string().optional(),
  } ).parse );

  const existing = await useDrizzle()
  .select( { name: tables.folders.name } )
  .from( tables.folders )
  .where( eq( tables.folders.name, body.name ) )
  .get();

  if ( existing ) {
    throw createError( {
      statusCode: 400,
      statusMessage: "Folder already exists",
    } );
  }

  const folderPath = path.join( process.cwd(), env.UPLOADS_DIR, body.path );

  await fs.mkdir( folderPath, { recursive: true } );

  return await useDrizzle()
  .insert( tables.folders )
  .values( {
    name: body.name,
    path: body.path,
    fullPath: folderPath,
    parent: body.parent,
  } )
  .returning()
  .get();
} );
