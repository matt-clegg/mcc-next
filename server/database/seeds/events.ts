import { eq } from "drizzle-orm";
import * as schema from "../schema";
import type { EventInsert } from "../../database/schema/events/events";
import type { EventPriceInsert } from "../../database/schema/events/event-prices";
import type { EventOccurrenceType } from "../../../shared/types/events";
import eventCategories from "./data/event-categories.json";
import events from "./legacy/events.json";
import type { Database } from "~~/server/utils/drizzle";

export default async function seed(db: Database) {
  console.log("Seeding event categories...");
  await db
    .insert(schema.eventCategories)
    .values(eventCategories);

  console.log("Seeding events...");

  const roles = await db
    .select()
    .from(schema.roles);

  console.log("roles", roles);
  const roleAliasMap: Record<string, string> = {
    "members": "member",
    "juniors": "junior",
    "non-members": "non-member"
  };

  const user = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, "admin@example.com"))
    .get();

  console.log("user", user);

  const categories = await db
    .select()
    .from(schema.eventCategories);

  for (const event of events) {
    let occurrenceType: EventOccurrenceType = "single";

    if (event.is_recurring) {
      occurrenceType = "recurring";
    }
    else if (event.has_multiple) {
      occurrenceType = "multi";
    }

    const category = categories.find(c => c.alias.replaceAll("-", "_") === event.type)!.id;

    const newEvent: EventInsert = {
      id: event.id,
      status: event.status as EventStatus,
      title: event.title,
      description: event.description ?? "<p>missing description</p>",
      location: event.location,
      occurrenceType,
      category,
      maxSpaces: event.max_spaces !== null ? Number(event.max_spaces) : null,

      // parent: event.parent_event ? event.parent_event.id : null,
      // TODO: handle parents in separate pass?
      parent: null,

      bookingAllowed: true,
      attendeesVisible: event.visible_attendees,
      allowBookingsAfterStart: event.allow_booking_after_start !== null ? event.allow_booking_after_start : false,
      lastBookingDate: event.last_booking_date ? new Date(event.last_booking_date) : null,
      minAge: event.min_age !== null ? Number(event.min_age) : null,

      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
      rrule: event.rrule,

      createdBy: user!.id,
      createdAt: new Date(event.date_created).toISOString(),
      updatedAt: event.date_updated ? new Date(event.date_updated).toISOString() : new Date(event.date_created).toISOString()
    };

    try {
      const { id } = await db
        .insert(schema.events)
        .values(newEvent)
        .returning({ id: schema.events.id })
        .get();

      if (event.allowed_roles?.length) {
        for (const role of event.allowed_roles) {
          if (role === "none") {
            continue;
          }

          const roleId = roles.find(r => r.alias === roleAliasMap[role])!.id;
          await db
            .insert(schema.eventAllowedRoles)
            .values({
              role: roleId,
              event: id
            });
        }
      }

      await addEventPricing(db, event, id, roles);
    }
    catch (err: any) {
      console.error("Could not add event", newEvent);
      console.log("Input event", event);
      throw err;
    }
  }
}

async function addEventPricing(db: Database, oldEvent: any, eventId: string, roles: Role[]) {
  if (oldEvent.price) {
    // TODO:
    // If there are other roles allowed that aren't junior, set prices for them as well

    // const allowedAdults = allowedRoles.filter(r => !r.includes("junior"));
    // if (allowedAdults.length > 0) {
    //   for (const role of allowedAdults) {
    //     await addPrice(db, {
    //       event: eventId,
    //       price: oldEvent.oldEvent.price,
    //       role: roles.find(r => r.alias === role)!.id
    //     });
    //   }
    // }

    await addPrice(db, {
      event: eventId,
      price: oldEvent.price
    });
  }

  if (oldEvent.junior_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.junior_price,
      role: roles.find(r => r.alias === "junior")!.id
    });
  }

  if (oldEvent.non_member_junior_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.non_member_junior_price,
      role: roles.find(r => r.alias === "junior-non-member")!.id
    });
  }

  if (oldEvent.non_member_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.non_member_price,
      role: roles.find(r => r.alias === "non-member")!.id
    });
  }

  if (oldEvent.member_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.member_price,
      role: roles.find(r => r.alias === "member")!.id
    });
  }

  if (oldEvent.coach_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.coach_price,
      role: roles.find(r => r.alias === "coach")!.id
    });
  }

  if (oldEvent.coach_price) {
    await addPrice(db, {
      event: eventId,
      price: oldEvent.coach_price,
      role: roles.find(r => r.alias === "coach")!.id
    });
  }
}

async function addPrice(db: Database, price: EventPriceInsert) {
  await db
    .insert(schema.eventPrices)
    .values(price);
}
