import path from "node:path";
import { promises as fs } from "fs";
import type { H3Event, MultiPartData } from "h3";
import { eq } from "drizzle-orm";

export async function uploadAsset(asset: MultiPartData, user: User, folder?: Folder) {
  if (!asset.type) {
    throw createError({
      statusCode: 400,
      message: "Invalid file type"
    });
  }

  const id = useHash();
  const isImage = asset.type.startsWith("image/");

  const { filename, data } = asset;

  let uploadDir = path.join(process.cwd(), env.UPLOADS_DIR, id);
  if (folder) {
    uploadDir = path.join(process.cwd(), env.UPLOADS_DIR, folder.path, id);
  }

  const uploadPath = path.join(uploadDir, filename!);

  await createFolder(uploadDir);

  await fs.writeFile(uploadPath, data);

  const stat = await fs.stat(uploadPath).catch(() => null);

  return useDrizzle()
    .insert(tables.assets)
    .values({
      id,
      filename: filename!,
      path: uploadPath,
      mimeType: asset.type,
      size: stat!.size,
      owner: user.id,
      folder: folder?.id,
      isImage: isImage
    })
    .returning()
    .get();
}

export async function createFolder(path: string) {
  await fs.mkdir(path, { recursive: true });
}

export async function getFolder(event: H3Event, folderId: string) {
  const folder = await useDrizzle()
    .query
    .folders
    .findFirst({
      where: eq(tables.folders.id, folderId),
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

  return folder;
}
