import { and, eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const id = getRouterParam(event, "id")!;

  const result = await useDrizzle()
    .select()
    .from(tables.medicalInfo)
    .where(and(eq(tables.medicalInfo.user, user.id), eq(tables.medicalInfo.id, id)))
    .get();

  if (!result) {
    throw createError({
      statusCode: 400,
      statusMessage: "Medical info already exists for user"
    });
  }

  const unsealed = await decrypt(result.data, env.ENCRYPTION_PASSWORD);

  return {
    id: result.id,
    ...JSON.parse(unsealed)
  } as MedicalInfo;
});
