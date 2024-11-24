import type { SessionUser } from "#auth-utils";

export function userHasRoleByAlias(user: SessionUser, ...roles: string[]) {
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  return user.roles.some(role => roles.includes(role.alias));
}

export function userHasRoleById(user: SessionUser, ...roleIds: string[]) {
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  return user.roles.some(role => roleIds.includes(role.id));
}
