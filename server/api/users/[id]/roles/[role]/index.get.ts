import { and, eq } from "drizzle-orm";

// Load a role for a user
export default eventHandler(async (event) => {
  const user = getRouterParam(event, "id")!;
  const role = getRouterParam(event, "role")!;

  await requireUserSession(event);

  await authorize(event, getRoleForUser, user);

  const found = await useDrizzle()
    .select()
    .from(tables.userRoles)
    .where(and(eq(tables.userRoles.user, user), eq(tables.userRoles.role, role)))
    .get();

  if (!found) {
    throw createError({
      statusCode: 404,
      message: "User role not found"
    });
  }

  return found;
});
