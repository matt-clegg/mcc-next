export const canCreateEventCategory = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});

export const canEditEventCategory = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});

export const canDeleteEventCategory = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});
