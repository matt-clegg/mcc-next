export const canCreateEventType = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});

export const canEditEventType = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});

export const canDeleteEventType = defineAbility((loggedInUser: User) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  return false;
});
