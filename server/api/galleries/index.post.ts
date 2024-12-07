import { z } from "zod";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const { name, description } = await readValidatedBody(event, z.object({
    name: z.string(),
    description: z.string().optional()
  }).parse);

  await authorize(event, canCreateGallery);

  const slug = slugify(name);

  const gallery = await useDrizzle()
    .insert(tables.galleries)
    .values({
      name,
      description,
      slug,
      createdBy: user.id
    })
    .returning()
    .get();

  await createFolder(`/galleries/${gallery.slug}`);

  return gallery;
});
