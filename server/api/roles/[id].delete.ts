import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await requireUserSession(event);

  await authorize(event, deleteRole);

  await useDrizzle()
    .delete(tables.roles)
    .where(eq(tables.roles.id, id));

  // Invalidate the all roles cache
  await useStorage("cache").removeItem("nitro:functions:list-roles:all.json");
});
