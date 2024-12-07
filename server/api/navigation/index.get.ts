export default eventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    return useDrizzle()
      .select()
      .from(tables.navigation);
  }
  else {
    // TODO: Need to get navigation items which user is allowed to view

    return useDrizzle()
      .select()
      .from(tables.navigation);
  }
});
