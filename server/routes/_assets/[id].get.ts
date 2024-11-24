import { promises as fs, createReadStream } from "node:fs";
import path from "node:path";
import { and, eq } from "drizzle-orm";
import sharp from "sharp";
import { z } from "zod";
import type { H3Event } from "h3";

type AvailableImageFormats = keyof sharp.FormatEnum;
const allowedImageFormats = ["avif", "dz", "fits", "gif", "heif", "input", "jpeg", "jpg", "jp2", "jxl", "magick", "openslide", "pdf", "png", "ppm", "raw", "svg", "tiff", "tif", "v", "webp"] as const;

function serveAsset(event: H3Event, path: string, format: string, size: number) {
  console.log("serving asset");
  const stream = createReadStream(path);
  event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  event.node.res.setHeader("Content-Type", format);
  event.node.res.setHeader("Content-Length", size);
  console.log("returning");
  return sendStream(event, stream);
}

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  const query = await getValidatedQuery(event, z.object({
    width: z.coerce.number().positive().optional(),
    height: z.coerce.number().positive().optional(),
    quality: z.coerce.number().min(1).max(100).optional(),
    format: z.enum(allowedImageFormats).optional(),
    fit: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional(),
    blur: z.coerce.number().min(0).max(100).optional()
  }).parse);

  const asset = await useDrizzle()
    .query
    .assets
    .findFirst({
      where: eq(tables.assets.id, id),
      with: {
        folder: true
      }
    });

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found"
    });
  }

  const fileExists = async (path: string) => {
    return await fs.stat(path).catch(() => null);
  };

  console.log("file exists?");
  if (!(await fileExists(asset.path))) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found on disk"
    });
  }

  const transforms = [];
  if (query.width) transforms.push(`w${query.width}`);
  if (query.height) transforms.push(`h${query.height}`);
  if (query.format) transforms.push(`f${query.format}`);
  if (query.quality) transforms.push(`q${query.quality}`);
  if (query.fit) transforms.push(`t${query.fit}`);
  if (query.blur) transforms.push(`b${query.blur}`);

  const transformKey = transforms.join("_");

  const transformation = await useDrizzle()
    .select()
    .from(tables.transforms)
    .where(and(eq(tables.transforms.originalAsset, id), eq(tables.transforms.transformKey, transformKey)))
    .get();

  if (transformation) {
    if (!(await fileExists(transformation.path))) {
      throw createError({
        statusCode: 404,
        statusMessage: "File not found on disk"
      });
    }

    return serveAsset(event, transformation.path, transformation.mimeType, transformation.size);
  }

  const isImage = asset.mimeType.startsWith("image/");
  const hasTransformParams = query.width || query.height || query.quality || query.format || query.fit;

  if (isImage && hasTransformParams) {
    const originalFormat = asset.mimeType.split("/")[1];
    const format = (query.format ?? originalFormat) as AvailableImageFormats;

    const safeFilename = path.basename(asset.path, path.extname(asset.path));
    const transformedFilename = `${safeFilename}_${transformKey}.${format}`;
    let transformedPath = path.join(process.cwd(), env.UPLOADS_DIR, asset.id, transformedFilename);
    if (asset.folder) {
      transformedPath = path.join(process.cwd(), env.UPLOADS_DIR, asset.folder.path, asset.id, transformedFilename);
    }

    // Needed to stop Windows file locks
    sharp.cache(false);
    let image = sharp(asset.path);

    if (query.width || query.height) {
      image = image.resize(query.width ?? null, query.height ?? null, {
        withoutEnlargement: true,
        fit: query.fit ?? undefined
      });
    }

    if (query.format || query.quality) {
      image = image.toFormat(format, {
        quality: query.quality ?? undefined
      });
    }

    if (query.blur) {
      image = image.blur(query.blur);
    }

    const transformedDir = path.dirname(transformedPath);
    await fs.mkdir(transformedDir, { recursive: true });

    await image.toFile(transformedPath);
    const transformedStat = await fs.stat(transformedPath).catch(() => null);

    image.destroy();

    await useDrizzle()
      .insert(tables.transforms)
      .values({
        originalAsset: id,
        transformKey: transformKey,
        filename: path.basename(transformedPath),
        path: transformedPath,
        size: transformedStat!.size,
        mimeType: `image/${format}`,
        width: query.width ?? null,
        height: query.height ?? null,
        format: query.format ?? null,
        quality: query.quality ?? null
      });

    return serveAsset(event, transformedPath, format, transformedStat!.size);
  }
  else {
    // Serving non image or an image with no transforms
    return serveAsset(event, asset.path, asset.mimeType, asset.size);
  }
});
