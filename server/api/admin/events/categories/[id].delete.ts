import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, canDeleteEventType);

  const id = getRouterParam(event, "id")!;

  const existing = await useDrizzle()
    .select({ id: tables.eventTypes.id })
    .from(tables.eventTypes)
    .where(eq(tables.eventTypes.id, id));

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event type not found"
    });
  }

  await useDrizzle()
    .delete(tables.eventTypes)
    .where(eq(tables.eventTypes.id, id));
});
