import { z } from "zod";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readValidatedBody(event, z.object({
    allergies: z.boolean(),
    asthma: z.boolean(),
    diabetes: z.boolean(),
    epilepsy: z.boolean(),
    other: z.boolean(),
    details: z.string().optional().nullable()
  }).parse);

  const existing = await useDrizzle()
    .select({ id: tables.medicalInfo.id })
    .from(tables.medicalInfo)
    .where(eq(tables.medicalInfo.user, user.id))
    .get();

  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: "Medical info already exists for user"
    });
  }

  const sealed = await encrypt(JSON.stringify(body), env.ENCRYPTION_PASSWORD);

  await useDrizzle()
    .insert(tables.medicalInfo)
    .values({
      data: sealed,
      user: user.id
    });
});
