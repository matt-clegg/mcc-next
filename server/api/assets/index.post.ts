import { z } from "zod";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  await authorize(event, canUploadAsset);

  const query = await getValidatedQuery(event, z.object({
    folder: z.string().optional()
  }).parse);
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: "No files were uploaded"
    });
  }

  let folder: Folder | undefined;

  if (query.folder) {
    folder = await getFolder(event, query.folder);
  }

  const item = formData[0];

  return uploadAsset(item, user, folder);
});
