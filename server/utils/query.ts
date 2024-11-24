import type { SQLiteSelect, SQLiteColumn } from "drizzle-orm/sqlite-core";
import { asc, desc, like, or, count } from "drizzle-orm";

export type ColumnMap = Record<string, SQLiteColumn>;

export function withPagination<T extends SQLiteSelect>(db: T, page: number = 1, limit: number = 10) {
  return db.limit(limit).offset(getOffset(page, limit));
}

export async function queryWithCount<T extends SQLiteSelect>(db: T): Promise<Paginated<T>> {
  const result = await db;
  // @ts-expect-error hack to override internals (not the ideal way)
  db.config.fields = { count: count() };
  // @ts-expect-error hack to override internals (not the ideal way)
  db.config.orderBy = [];
  const [total] = await db;
  console.log("got total", total);
  return { data: result, count: total?.count };
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
