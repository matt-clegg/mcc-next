import { z } from "zod";
import { eq } from "drizzle-orm";

// Update a role
export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
  const body = await readValidatedBody(event, z.object({
    name: z.string()
  }).parse);

  const existing = await useDrizzle()
    .select()
    .from(tables.roles);

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "Role not found"
    });
  }

  await useDrizzle()
    .update(tables.roles)
    .set(body)
    .where(eq(tables.roles.id, id));

  console.log("invalidated cache for role", id);
  // Invalidate the all roles cache
  await useStorage("cache").removeItem(`nitro:functions:roles:${id}.json`);
});
