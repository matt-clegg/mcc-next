export const canCreateGallery = defineAbility((loggedInUser: User) => {
  if (userHasRoleByAlias(loggedInUser, "member")) {
    return true;
  }

  return false;
});
