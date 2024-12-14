export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, adminListUsers);

  const queryColumns = [
    tables.users.firstName,
    tables.users.lastName,
    tables.users.email
  ];

  const sortColumns = {
    name: tables.users.lastName,
    createdAt: tables.users.createdAt,
    lastAccess: tables.users.lastAccess
  };

  return getQueryData<User[]>(event, tables.users, queryColumns, sortColumns);
});
