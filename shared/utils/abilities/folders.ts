import type { User } from "#auth-utils";
import type { Folder } from "#shared/types/folders";
import { userHasRoleById } from "#shared/utils/roles";

export const canCreateFolder = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const canUploadToFolder = defineAbility((loggedInUser: User, folder: Folder) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  for (const permission of folder.permissions) {
    if (permission.user && permission.user.id === loggedInUser.id) {
      return true;
    }

    if (permission.role && userHasRoleById(loggedInUser, permission.role.id)) {
      return true;
    }
  }

  return false;
});
