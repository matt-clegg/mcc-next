import type { User } from "#auth-utils";

export const adminListUsers = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  // if user has a role
  if (userHasRoleByAlias(loggedInUser, "manage-users")) {
    return true;
  }

  return false;
});
