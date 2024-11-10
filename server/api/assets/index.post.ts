import path from "node:path";
import { promises as fs } from "node:fs";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: "No files were uploaded"
    });
  }

  for (const item of formData) {
    {
      console.log("got type", item.type);
      // if (item.type === "image/jpeg") {
      const { filename, data } = item;
      const uploadDir = path.join(process.cwd(), ".uploads");
      const uploadPath = path.join(uploadDir, filename!);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(uploadPath, data);

      const stat = await fs.stat(uploadPath).catch(() => null);

      const asset = await useDrizzle()
        .insert(tables.assets)
        .values({
          filename: filename!,
          path: uploadPath,
          mimeType: item.type!,
          size: stat!.size,
          uploader: user.id
        })
        .returning()
        .get();

      console.log("uploaded file", asset);
      // }
    }
  }
});
