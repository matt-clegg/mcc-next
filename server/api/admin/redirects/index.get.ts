export default eventHandler(async (event) => {
  await requireUserSession(event);

  const queryColumns = [tables.redirects.to, tables.redirects.from];
  const sortColumns = {
    createdAt: tables.redirects.createdAt
  };

  return await getQueryData(event, tables.redirects, queryColumns, sortColumns);
});
