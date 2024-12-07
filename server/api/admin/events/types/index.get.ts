import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const sortColumns = {
    name: tables.eventTypes.name,
    createdBy: tables.eventTypes.createdBy,
    createdAt: tables.eventTypes.createdAt
  };

  const relations = {
    createdBy: {
      table: tables.users,
      on: eq(tables.eventTypes.createdBy, tables.users.id)
    }
  };

  return await getQueryData(event, tables.eventTypes, [], sortColumns, relations);
});
