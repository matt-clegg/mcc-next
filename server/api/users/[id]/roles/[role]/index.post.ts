// Give a user a role
export default eventHandler(async (event) => {
  const user = getRouterParam(event, "id")!;
  const role = getRouterParam(event, "role")!;

  await requireUserSession(event);

  await authorize(event, modifyUserRoles);

  return useDrizzle()
    .insert(tables.userRoles)
    .values({
      user,
      role
    })
    .returning()
    .get();
});
