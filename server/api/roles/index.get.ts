﻿import { eq } from "drizzle-orm";

// List all roles
export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, listRoles);

  return useDrizzle()
    .select()
    .from(tables.roles)
    .where(eq(tables.roles.visibility, "public"));
});
