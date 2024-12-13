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

  return useDrizzle()
    .insert(tables.roles)
    .values(role)
    .returning()
    .get();
});
