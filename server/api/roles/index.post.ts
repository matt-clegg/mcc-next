import { kebabCase } from "scule";

// Create a new role
export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, createRoleValidator.parse);

  await requireUserSession(event);

  await authorize(event, createRole);

  const role = {
    ...body,
    alias: kebabCase(body.name)
  };

  const result = await useDrizzle()
    .insert(tables.roles)
    .values(role)
    .returning()
    .get();

  // Invalidate the all roles cache
  console.log("invalidating all roles cache");
  await useStorage("cache").removeItem("nitro:functions:list-roles:all.json");

  return result;
});
