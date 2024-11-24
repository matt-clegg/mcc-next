import { z } from "zod";

// Create a new role
export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    name: z.string()
  }).parse);

  await requireUserSession(event);

  await authorize(event, createRole);

  const result = await useDrizzle()
    .insert(tables.roles)
    .values(body)
    .returning()
    .get();

  // Invalidate the all roles cache
  console.log("invalidating all roles cache");
  await useStorage("cache").removeItem("nitro:functions:list-roles:all.json");

  return result;
});
