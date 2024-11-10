import type { User } from "#auth-utils";

export const editUser = defineAbility((loggedInUser: User, userToEditId: string) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  if (loggedInUser.id === userToEditId) {
    return true;
  }

  return false;
});
