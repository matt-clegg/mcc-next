export const canUploadAsset = defineAbility((loggedInUser: User) => {
  console.log("user", loggedInUser);

  if (loggedInUser.isAdmin) {
    console.log("user is admin, can upload asset");
    return true;
  }

  // TODO: user has role?

  console.log("user is not admin, can't upload asset");
  return false;
});

export const canDeleteAsset = defineAbility((loggedInUser: User, asset: Asset) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  if (asset.mimeType === "folder") {
    return false;
  }

  if (asset.owner) {
    return asset.owner?.id === loggedInUser.id;
  }

  return false;
});
