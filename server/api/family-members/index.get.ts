import { eq } from "drizzle-orm";
import type { H3Event } from "h3";
import { listFamilyMembers } from "#shared/utils/abilities/family-members";

export default eventHandler(async (event: H3Event) => {
  const { user } = await requireUserSession(event);

  await authorize(event, listFamilyMembers);

  return useDrizzle()
    .select()
    .from(tables.familyMembers)
    .where(eq(tables.familyMembers.owner, user.id));
});
