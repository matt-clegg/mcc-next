import { eq, inArray } from "drizzle-orm";
import { tables } from "~~/server/utils/drizzle";
import type { UserInsert, UserSelect } from "~~/server/database/schema/users";

export async function listUsers(ids?: string[]): Promise<UserSelect[]> {
  // TODO: Pagination?
  const users = await useDrizzle()
    .query
    .users
    .findMany({
      where: ids ? inArray(tables.users.id, ids) : undefined,
      with: {
        roles: {
          columns: {
            user: false
          },
          with: {
            role: true
          }
        }
      }
    });

  return users.map(user => ({
    ...user,
    roles: user.roles.map(role => role.role)
  }));
}

export async function getUser(id: string): Promise<UserSelect | undefined> {
  const user = await useDrizzle()
    .query
    .users
    .findFirst({
      where: eq(tables.users.id, id),
      with: {
        roles: {
          columns: {
            user: false
          },
          with: {
            role: true
          }
        }
      }
    });

  if (user) {
    return {
      ...user,
      roles: user.roles.map(role => role.role)
    };
  }
  return undefined;
}

export async function updateUser(id: string, user: Partial<UserSelect>) {
  await useDrizzle()
    .update(tables.users)
    .set(user)
    .where(eq(tables.users.id, id));

  return getUser(id);
}

export async function createUser(user: UserInsert): Promise<UserSelect> {
  const { id } = await useDrizzle()
    .insert(tables.users)
    .values(user)
    .returning({ id: tables.users.id })
    .get();

  const foundUser = await getUser(id);
  return foundUser!;
}
