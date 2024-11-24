import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readValidatedBody(event, z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8)
  }).parse);

  const credential = await useDrizzle()
    .select()
    .from(tables.credentials)
    .where(eq(tables.credentials.user, user.id))
    .get();

  if (!credential) {
    throw createError({
      statusCode: 400,
      statusMessage: "No credentials found for user"
    });
  }

  const match = await verifyPassword(credential.passwordHash, body.oldPassword);
  if (match) {
    throw createError({
      statusCode: 400,
      statusMessage: "Incorrect password"
    });
  }

  const hewHash = await hashPassword(body.newPassword);
  await useDrizzle()
    .update(tables.credentials)
    .set({ passwordHash: hewHash })
    .where(eq(tables.credentials.user, user.id));
});
