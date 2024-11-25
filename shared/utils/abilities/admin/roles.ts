import type { SessionUser } from "#auth-utils";

export const adminListRoles = defineAbility((user: SessionUser) => {
  if (user.isAdmin) {
    return true;
  }

  if (userHasRoleByAlias(user, "manage-roles")) {
    return true;
  }

  return false;
});
