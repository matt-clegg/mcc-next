import type { User } from "#auth-utils";
import type { FamilyMemberInsert } from "~~/server/database/schema/family-members";

export const listFamilyMembers = defineAbility(() => true);

export const updateFamilyMember = defineAbility((user: User, familyMember: FamilyMemberInsert | undefined) => {
  if (user.isAdmin) {
    return true;
  }

  if (familyMember && familyMember.owner === user.id) {
    return true;
  }

  return false;
});

export const createFamilyMember = defineAbility(() => true);
