import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const queryColumns = [tables.events.title, tables.events.location];
  const sortColumns = {
    name: tables.events.title,
    createdAt: tables.events.createdAt
  };

  return await getQueryData(event, tables.events, queryColumns, sortColumns);
});
