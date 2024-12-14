export default eventHandler(async (event) => {
  await requireUserSession(event);

  const queryColumns = [
    tables.events.title,
    tables.events.location
  ];

  const sortColumns = {
    status: tables.events.status,
    title: tables.events.title,
    location: tables.events.location,
    startDate: tables.events.startDate,
    createdAt: tables.events.createdAt
  };

  return await getQueryData(event, tables.events, queryColumns, sortColumns);
});
