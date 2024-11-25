export default eventHandler(async (event) => {
  await requireUserSession(event);

  await authorize(event, adminListRoles);

  const queryColumns = [tables.roles.name];
  const sortColumns = {
    name: tables.roles.name
  };

  return await getQueryData(event, tables.roles, queryColumns, sortColumns);
});
