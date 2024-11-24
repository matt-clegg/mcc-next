import type { User } from "#auth-utils";

export function userHasRoleByName(user: User, role: string) {
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  const roleLower = role.toLowerCase();
  const foundRole = user.roles.find(r => r.name.toLowerCase() === roleLower);
  return !!foundRole;
}

export function userHasRoleById(user: User, roleId: string) {
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  const foundRole = user.roles.find(r => r.id === roleId);
  return !!foundRole;
}
 
