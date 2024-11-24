import { z } from "zod";

export default eventHandler(async (event) => {
  const { page, limit } = await getPaginationQuery(event);

  const { sort, q } = await getValidatedQuery(event, z.object({
    sort: z.string().optional(),
    q: z.string().optional()
  }).parse);

  let query = useDrizzle()
    .select()
    .from(tables.users)
    .$dynamic();

  // WHERE clause needs to happen first
  if (q) {
    query = withTextQuery(query, q, tables.users.firstName, tables.users.lastName, tables.users.email);
  }

  // Then the ORDER BY clause
  if (sort) {
    query = withSort(query, sort, {
      name: tables.users.lastName,
      date: tables.users.createdAt
    });
  }

  // Finally the LIMIT and OFFSET clauses
  query = withPagination(query, page, limit);

  return await queryWithCount(query);
});
