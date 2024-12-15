import { z } from "zod";

export const createEventWizardValidator = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string().optional(),
  category: z.string(),
  occurrenceType: z.enum(["single", "multi", "recurring"]),
  maxSpaces: z.number().min(1).optional(),

  allowedRoles: z.array(z.string()).optional(),
  prices: z.record(z.string(), z.number()).optional(),

  bookingAllowed: z.boolean(),
  attendeesVisible: z.boolean(),
  allowBookingsAfterStart: z.boolean(),
  lastBookingDate: z.coerce.date().optional(),
  minAge: z.number().optional(),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  rrule: z.string().optional(),
  dates: z.array(z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date()
  }))
});

export type CreateEventWizardSchema = z.output<typeof createEventWizardValidator>;
