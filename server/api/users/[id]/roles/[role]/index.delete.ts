import { and, eq } from "drizzle-orm";
import { modifyUserRoles } from "#shared/utils/abilities/roles";

// Remove a role from a user
export default eventHandler(async (event) => {
  const user = getRouterParam(event, "id")!;
  const role = getRouterParam(event, "role")!;

  await requireUserSession(event);

  await authorize(event, modifyUserRoles);

  const existing = await useDrizzle()
    .select()
    .from(tables.userRoles)
    .where(and(eq(tables.userRoles.user, user), eq(tables.userRoles.role, role)))
    .get();

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: "User role not found"
    });
  }

  await useDrizzle()
    .delete(tables.userRoles)
    .where(and(eq(tables.userRoles.user, user), eq(tables.userRoles.role, role)));
});
