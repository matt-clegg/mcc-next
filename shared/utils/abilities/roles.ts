import type { User } from "#auth-utils";

export const modifyUserRoles = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const getRoleForUser = defineAbility((loggedInUser: User, userId: string) => {
  return loggedInUser.isAdmin || loggedInUser.id === userId;
});

export const listRolesForUser = defineAbility((loggedInUser: User, userId: string) => {
  return loggedInUser.isAdmin || loggedInUser.id === userId;
});

export const listRoles = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const createRole = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const deleteRole = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const getRole = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});

export const listUsersWithRole = defineAbility((loggedInUser: User) => {
  return loggedInUser.isAdmin;
});
