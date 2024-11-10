import { eq } from "drizzle-orm";
import { getRole } from "#shared/utils/abilities/roles";

const cachedRole = cachedFunction(async (id: string) => {
  console.log("inside cached role function");
  return useDrizzle()
    .select()
    .from(tables.roles)
    .where(eq(tables.roles.id, id));
}, {
  maxAge: 60 * 60 * 24, // 1 day,
  name: "role",
  getKey: (id: string) => id
});

// Get a role
export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await requireUserSession(event);

  await authorize(event, getRole);

  // return useDrizzle()
  //   .select()
  //   .from(tables.roles)
  //   .where(eq(tables.roles.id, id));

  const role = await cachedRole(id);
  console.log("got role:", role);
  return role;
});
