import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const queryColumns = [tables.news.title];
  const sortColumns = {
    name: tables.news.title,
    createdAt: tables.news.createdAt
  };

  const relations = {
    createdBy: {
      table: tables.users,
      on: eq(tables.news.createdBy, tables.users.id)
    }
  };

  return await getQueryData(event, tables.news, queryColumns, sortColumns, relations);
});
