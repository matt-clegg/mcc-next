import { eq } from "drizzle-orm";
import { listUsersWithRole } from "#shared/utils/abilities/roles";

// Get users with specific role
export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await requireUserSession(event);

  await authorize(event, listUsersWithRole);

  const existing = await useDrizzle()
    .select()
    .from(tables.roles)
    .where(eq(tables.roles.id, id));

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "Role not found"
    });
  }

  const roles = await useDrizzle()
    .query
    .userRoles
    .findMany({
      where: eq(tables.userRoles.role, id),
      with: {
        user: true
      }
    });

  return roles.map(r => r.user);
});
