import { z } from "zod";

export const createEventTypeValidator = z.object({
  name: z.string().min(3).max(32),
  color: z.string()
});

export const editEventTypeValidator = z.object({
  name: z.string().min(3).max(32),
  color: z.string()
});

export type CreateEventTypeSchema = z.output<typeof createEventTypeValidator>;
export type EditEventTypeSchema = z.output<typeof editEventTypeValidator>;
