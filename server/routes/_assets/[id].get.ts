import fs from "node:fs";
import path from "node:path";
import { and, eq } from "drizzle-orm";
import sharp from "sharp";
import { z } from "zod";

type AvailableImageFormats = keyof sharp.FormatEnum;
const allowedImageFormats = ["avif", "dz", "fits", "gif", "heif", "input", "jpeg", "jpg", "jp2", "jxl", "magick", "openslide", "pdf", "png", "ppm", "raw", "svg", "tiff", "tif", "v", "webp"] as const;

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  const query = await getValidatedQuery(event, z.object({
    width: z.coerce.number().positive().optional(),
    height: z.coerce.number().positive().optional(),
    quality: z.coerce.number().min(1).max(100).optional(),
    format: z.enum(allowedImageFormats).optional(),
    fit: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional()
  }).parse);

  const asset = await useDrizzle()
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.id, id))
    .get();

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: "File not found"
    });
  }

  const fsPromises = fs.promises;

  const fileExists = async (path: string) => {
    return await fsPromises.stat(path).catch(() => null);
  };

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

    const stream = fs.createReadStream(transformation.path);
    event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    event.node.res.setHeader("Content-Type", transformation.mimeType);
    event.node.res.setHeader("Content-Length", transformation.size);
    return sendStream(event, stream);
  }

  const isImage = asset.mimeType.startsWith("image/");
  const hasTransformParams = query.width || query.height || query.quality || query.format || query.fit;

  if (isImage && hasTransformParams) {
    const originalFormat = asset.mimeType.split("/")[1];
    const format = (query.format ?? originalFormat) as AvailableImageFormats;

    const safeFilename = path.basename(asset.path, path.extname(asset.path));
    const transformedFilename = `${safeFilename}_${transformKey}.${format}`;
    const transformedPath = path.join(process.cwd(), ".uploads", "transformed", transformedFilename);

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

    const transformedDir = path.dirname(transformedPath);
    fs.mkdirSync(transformedDir, { recursive: true });

    await image.toFile(transformedPath);
    const transformedStat = await fsPromises.stat(transformedPath).catch(() => null);

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

    const transformedStream = fs.createReadStream(transformedPath);
    event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    event.node.res.setHeader("Content-Type", `image/${format}`);
    event.node.res.setHeader("Cache-Length", transformedStat!.size.toString());
    return sendStream(event, transformedStream);
  }
  else {
    // serving non image or an image with no transforms
    const stream = fs.createReadStream(asset.path);
    event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    event.node.res.setHeader("Content-Type", asset.mimeType);
    event.node.res.setHeader("Content-Length", asset.size);
    return sendStream(event, stream);
  }
});
