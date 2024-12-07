import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler( async ( event ) => {
  await requireUserSession( event );

  const { parent } = await getValidatedQuery( event, z.object( {
    parent: z.string().optional()
  } ).parse );

  const query = useDrizzle()
  .select()
  .from( tables.folders )
  .$dynamic();
  
  if(parent){
    query.where(eq(tables.folders.parent, parent));
  }
  
  return query;
} );
