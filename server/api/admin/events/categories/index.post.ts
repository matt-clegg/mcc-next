import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  await authorize(event, canCreateEventCategory);

  const body = await readValidatedBody(event, createEventCategoryValidator.parse);

  const alias = slugify(body.name);

  const existing = await useDrizzle()
    .select({ alias: tables.eventCategorys.alias })
    .from(tables.eventCategorys)
    .where(eq(tables.eventCategorys.alias, alias))
    .get();

  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event category with that name already exists"
    });
  }

  return useDrizzle()
    .insert(tables.eventCategories)
    .values({
      ...body,
      alias,
      createdBy: user.id
    });
});
