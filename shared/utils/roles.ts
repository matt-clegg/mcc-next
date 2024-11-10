import type { User } from "#auth-utils";

export function userHasRole(user: User, role: string) {
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  const roleLower = role.toLowerCase();
  const foundRole = user.roles.find(r => r.name.toLowerCase() === roleLower);
  return !!foundRole;
}
