import type { SessionUser } from "#auth-utils";

export const canUploadAsset = defineAbility((loggedInUser: SessionUser) => {
  console.log("user", loggedInUser);

  if (loggedInUser.isAdmin) {
    console.log("user is admin, can upload asset");
    return true;
  }

  // TODO: user has role?

  console.log("user is not admin, can't upload asset");
  return false;
});
