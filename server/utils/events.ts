import { eq } from "drizzle-orm";
import type { EventPrice } from "~~/server/database/schema/events/event-prices";
import type { User } from "#auth-utils";

export async function getEvent(eventId: string, instance?: number) {
  return useDrizzle()
    .select()
    .from(tables.events)
    .where(eq(tables.events.id, eventId))
    .get();
}

export async function getEventBookings(eventId: string, instance?: number) {
  const query = useDrizzle()
    .select()
    .from(tables.eventBookings)
    .where(eq(tables.eventBookings.event, eventId))
    .$dynamic();

  if (instance !== null && instance !== undefined) {
    query.where(eq(tables.eventBookings.instance, instance));
  }

  return query;
}

export async function createEventBooking(event: string, user: string, status: "booked" | "cancelled", instance?: number) {
  return useDrizzle()
    .insert(tables.eventBookings)
    .values({
      event,
      user,
      status,
      instance
    })
    .returning({ id: tables.eventBookings.id })
    .get();
}

export async function getEventPrices(eventId: string) {
  return useDrizzle()
    .select()
    .from(tables.eventPrices)
    .where(eq(tables.eventPrices.event, eventId));
}

export function getPriceForUser(user: User, eventPrices: EventPrice[]) {
  if (!user.roles.length) {
    // user has no roles???
    return null;
  }

  const sortedRoles = user.roles.sort((a, b) => a.priority - b.priority);

  for (const role of sortedRoles) {
    const price = eventPrices.find(p => p.role === role.id);
    if (price) {
      return price;
    }
  }

  return null;
}
