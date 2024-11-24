import type { SessionUser } from "#auth-utils";

export const editUser = defineAbility((loggedInUser: SessionUser, userToEditId: string) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  if (loggedInUser.id === userToEditId) {
    return true;
  }

  return false;
});
