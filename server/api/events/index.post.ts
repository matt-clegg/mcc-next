export default eventHandler(async (event) => {
  // const { user } =
  await requireUserSession(event);

  const newEvent = {
    name: "The event",
    description: "<p>This is the description</p>"
  };

  return useDrizzle()
    .insert(tables.events)
    .values(newEvent)
    .returning()
    .get();
});
