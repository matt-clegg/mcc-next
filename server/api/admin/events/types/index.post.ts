import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  await authorize(event, canCreateEventType);

  const body = await readValidatedBody(event, createEventTypeValidator.parse);

  const alias = slugify(body.name);

  const existing = await useDrizzle()
    .select({ alias: tables.eventTypes.alias })
    .from(tables.eventTypes)
    .where(eq(tables.eventTypes.alias, alias))
    .get();

  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event type with that name already exists"
    });
  }

  return useDrizzle()
    .insert(tables.eventTypes)
    .values({
      ...body,
      alias,
      createdBy: user.id
    });
});
