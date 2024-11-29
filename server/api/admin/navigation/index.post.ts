import { z } from "zod";
import { count, eq, and } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const body = await readValidatedBody(event, z.object({
    name: z.string(),
    parent: z.string().nullable(),
    page: z.string().optional(),
    url: z.string().optional(),
    order: z.coerce.number()
  }).refine(data => data.page || data.url, {
    message: "Either page or url must be provided",
    path: ["page", "url"]
  }).parse);

  let navigationUrl = body.url;

  if (body.page) {
    const page = await useDrizzle()
      .select({ url: tables.pages.slug })
      .from(tables.pages)
      .where(eq(tables.pages.id, body.page))
      .get();

    if (!page) {
      throw createError({
        statusCode: 400,
        message: "Could not create navigation item. Page not found."
      });
    }

    navigationUrl = page.url;
  }

  // Ensure no two nav items within the same "folder" have the same order value

  // const [{ count: siblingsWithSameOrderCount }] = await useDrizzle()
  //   .select({ count: count() })
  //   .from(tables.navigation)
  //   .where(and(
  //     eq(tables.navigation.parent, body.parent),
  //     eq(tables.navigation.order, body.order)
  //   ));

  const siblingsWithSameOrder = await useDrizzle()
    .query
    .navigation
    .findMany({
      columns: { parentId: true, order: true },
      where: (navigation, { eq, and }) => (and(
        eq(navigation.parentId, body.parent),
        eq(navigation.order, body.order)
      ))
    });

  if (siblingsWithSameOrder.length > 0) {
    throw createError({
      statusCode: 400,
      message: "Could not create navigation item. Order must be unique."
    });
  }

  return useDrizzle()
    .insert(tables.navigation)
    .values({
      name: body.name,
      parent: body.parent,
      page: body.page,
      url: navigationUrl!,
      order: body.order
    })
    .returning()
    .get();
});
