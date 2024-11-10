﻿import { eq } from "drizzle-orm";
import type { H3Event } from "h3";
import { listRolesForUser } from "#shared/utils/abilities/roles";

// List roles for a specific user
export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await requireUserSession(event);

  await authorize(event, listRolesForUser, id);

  const result = await useDrizzle()
    .select()
    .from(tables.userRoles)
    .where(eq(tables.userRoles.user, id));

  if (result.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found"
    });
  }

  return result;
});
