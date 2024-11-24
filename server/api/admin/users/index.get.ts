import type { SessionUser } from "#auth-utils";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, adminListUsers);

  const queryColumns = [
    tables.users.firstName,
    tables.users.lastName,
    tables.users.email];

  const sortColumns = {
    name: tables.users.lastName,
    createdAt: tables.users.createdAt,
    lastAccess: tables.users.lastAccess
  };

  return getQueryData<SessionUser[]>(event, tables.users, queryColumns, sortColumns);
});
