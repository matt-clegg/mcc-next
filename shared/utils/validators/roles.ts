import { z } from "zod";

export const createRoleValidator = z.object({
  name: z.string().min(3).max(32),
  isPublic: z.boolean().optional().default(false),
  priority: z.number().min(0)
});

export type CreateRoleSchema = z.output<typeof createRoleValidator>;
