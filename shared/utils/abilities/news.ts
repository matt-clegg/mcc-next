import type { User } from "#auth-utils";

export const canCreateNews = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  if (userHasRole(loggedInUser, "editor")) {
    return true;
  }

  return false;
});
