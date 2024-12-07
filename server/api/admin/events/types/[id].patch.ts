import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, canEditEventType);

  const id = getRouterParam(event, "id")!;
  const body = await readValidatedBody(event, editEventTypeValidator.parse);

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

  const newAlias = slugify(body.name);

  const sameAlias = await useDrizzle()
    .select({ alias: tables.eventTypes.alias })
    .from(tables.eventTypes)
    .where(eq(tables.eventTypes.alias, newAlias))
    .get();

  if (sameAlias) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event type with that name already exists"
    });
  }

  return useDrizzle()
    .update(tables.eventTypes)
    .set({
      ...body,
      alias: newAlias
    })
    .where(eq(tables.eventTypes.id, id))
    .returning()
    .get();
});
