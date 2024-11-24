import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    email: z.string().email()
  }).parse);

  const user = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, body.email))
    .get();

  const tokenExpiresLength = 1000 * 60 * 60 * 24; // one day

  if (user) {
    const token = await useDrizzle()
      .insert(tables.passwordResetTokens)
      .values({
        user: user.id,
        token: useHash(34),
        expiresAt: new Date(Date.now() + tokenExpiresLength).toISOString()
      })
      .returning()
      .get();
  }
});
