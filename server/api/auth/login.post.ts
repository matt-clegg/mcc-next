import { z } from "zod";
import { eq } from "drizzle-orm";
import { tables } from "~~/server/utils/drizzle";

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string()
  }).parse);

  const user = await useDrizzle()
    .select({ id: tables.users.id, email: tables.users.email })
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Incorrect credentials"
    });
  }

  const credentials = await useDrizzle()
    .select()
    .from(tables.credentials)
    .where(eq(tables.credentials.user, user.id))
    .get();

  const passwordsMatch = await verifyPassword(credentials!.passwordHash, password);
  if (!passwordsMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: "Incorrect credentials"
    });
  }

  // const loggedInUser = await getUser(user.id);
  const loggedInUser = await updateUser(user.id, {
    lastAccess: new Date().toISOString()
  });

  await setUserSession(event, { user: loggedInUser! });

  return loggedInUser;
});
