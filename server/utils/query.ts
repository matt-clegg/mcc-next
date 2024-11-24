import type { SQLiteSelect, SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import { asc, count, desc, like, or } from "drizzle-orm";
import type { H3Event } from "h3";
import { z } from "zod";

export type ColumnMap = Record<string, SQLiteColumn>;

export function withPagination<T extends SQLiteSelect>(db: T, page: number = 1, limit: number = 10) {
  return db.limit(limit).offset(getOffset(page, limit));
}

export function withSort<T extends SQLiteSelect>(db: T, sort: string, columns: ColumnMap) {
  const dir = sort.startsWith("-") ? "desc" : "asc";
  sort = sort.replace("-", "");

  const column = columns[sort];

  if (!column) {
    return db;
  }

  if (dir === "desc") {
    return db.orderBy(desc(column));
  }
  else {
    return db.orderBy(asc(column));
  }
}

export function withTextQuery<T extends SQLiteSelect>(db: T, query: string, ...columns: SQLiteColumn[]) {
  const pattern = `%${query}%`;
  const conditions = columns.map(column => like(column, pattern));
  return db.where(or(...conditions));
}

export async function getQueryData<T>(event: H3Event, source: SQLiteTable, queryColumns?: SQLiteColumn[], sortColumns?: ColumnMap) {
  const { page, limit } = await getPaginationQuery(event);

  const { sort, q } = await getValidatedQuery(event, z.object({
    sort: z.string().optional(),
    q: z.string().optional()
  }).parse);

  let baseQuery = useDrizzle()
    .select()
    .from(source)
    .$dynamic();

  let countQuery = useDrizzle()
    .select({ count: count() })
    .from(source)
    .$dynamic();

  // The order of queries matter
  // WHERE (text query) -> ORDER BY (sorting) -> LIMIT + OFFSET (pagination)

  if (q && queryColumns?.length) {
    baseQuery = withTextQuery(baseQuery, q, ...queryColumns);

    // We need to count the WHERE query to return the correct number of items for pagination
    countQuery = withTextQuery(countQuery, q, ...queryColumns);
  }

  if (sort && sortColumns && Object.keys(sortColumns).length) {
    baseQuery = withSort(baseQuery, sort, sortColumns);
  }

  baseQuery = withPagination(baseQuery, page, limit);

  const [data, [{ count: countValue }]] = await Promise.all([
    baseQuery.execute(),
    countQuery.execute()
  ]);

  return {
    data,
    count: countValue
  } as Paginated<T>;
}
