const cachedListRoles = cachedFunction(async () => {
  console.log("inside load all roles function");
  return useDrizzle()
    .select()
    .from(tables.roles);
}, {
  maxAge: 60 * 60 * 24, // 1 day
  name: "list-roles",
  getKey: () => "all"
});

// List all roles
export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, listRoles);

  return cachedListRoles();
});
