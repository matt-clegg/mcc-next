export default eventHandler(async (event) => {
  await requireUserSession(event);

  return useDrizzle()
    .select()
    .from(tables.navigation);
});
