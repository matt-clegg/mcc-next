// Get a role
export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await requireUserSession(event);

  await authorize(event, getRole);

  return useDrizzle()
    .select()
    .from(tables.roles)
    .where(eq(tables.roles.id, id));
});
