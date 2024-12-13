import { z } from "zod";

export const createRoleValidator = z.object({
  name: z.string().min(3).max(32),
  description: z.string().max(500).optional().nullable(),
  type: z.enum(["public", "administrative"]),
  visibility: z.enum(["public", "internal"]),
  priority: z.number().min(0)
});

export const editRoleValidator = z.object({
  name: z.string().min(3).max(32),
  description: z.string().max(500).nullable(),
  type: z.enum(["public", "administrative"]),
  visibility: z.enum(["public", "internal"]),
  priority: z.number().min(0)
});

export type CreateRoleSchema = z.output<typeof createRoleValidator>;
export type EditRoleSchema = z.output<typeof editRoleValidator>;
