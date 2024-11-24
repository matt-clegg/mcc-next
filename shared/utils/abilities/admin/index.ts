export const isAdmin = defineAbility((loggedInUser) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  const adminRoles = [
    "manage-users",
    "manage-events"
  ];

  if (userHasRoleByAlias(loggedInUser, ...adminRoles)) {
    return true;
  }

  return false;
});
