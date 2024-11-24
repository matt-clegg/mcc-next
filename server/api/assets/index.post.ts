import path from "node:path";
import { promises as fs } from "node:fs";
import { z } from "zod";
import { eq } from "drizzle-orm";

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
    folder = await useDrizzle()
      .query
      .folders
      .findFirst({
        where: eq(tables.folders.id, query.folder),
        with: {
          permissions: {
            with: {
              user: {
                columns: {
                  id: true
                }
              },
              role: true
            }
          }
        }
      });

    if (!folder) {
      throw createError({
        statusCode: 400,
        message: "Invalid folder"
      });
    }

    if (folder.permissions.length) {
      await authorize(event, canUploadToFolder, folder);
    }
  }

  const item = formData[0];

  if (!item.type) {
    throw createError({
      statusCode: 400,
      message: "Invalid file type"
    });
  }

  const id = useHash();
  const isImage = item.type.startsWith("image/");

  const { filename, data } = item;
  let uploadDir = path.join(process.cwd(), env.UPLOADS_DIR, id);
  if (folder) {
    uploadDir = path.join(process.cwd(), env.UPLOADS_DIR, folder.path, id);
  }

  const uploadPath = path.join(uploadDir, filename!);

  await fs.mkdir(uploadDir, { recursive: true });

  await fs.writeFile(uploadPath, data);

  const stat = await fs.stat(uploadPath).catch(() => null);

  return await useDrizzle()
    .insert(tables.assets)
    .values({
      id,
      filename: filename!,
      path: uploadPath,
      mimeType: item.type,
      size: stat!.size,
      owner: user.id,
      folder: query.folder,
      isImage: isImage
    })
    .returning()
    .get();
});
