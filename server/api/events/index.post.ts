import type { CreateEventWizardSchema } from "#shared/utils/validators/event-wizard";
import { createEventWizardValidator } from "#shared/utils/validators/event-wizard";
import type { EventInsert } from "~~/server/database/schema/events/events";
import type { User } from "#auth-utils";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const newEvent = await readValidatedBody(event, createEventWizardValidator.parse);

  if (newEvent.occurrenceType === "single" || newEvent.occurrenceType === "recurring") {
    await createSingleEvent(newEvent, user);
  }
  else if (newEvent.occurrenceType === "multi") {
    await createMultiEvent(newEvent, user);
  }
  else {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid occurrence type"
    });
  }
});

async function createSingleEvent(newEvent: CreateEventWizardSchema, user: User) {
  const { id } = await useDrizzle()
    .insert(tables.events)
    .values(eventWizardItemToEvent(newEvent, user))
    .returning({ id: tables.events.id })
    .get();

  console.log("new event", id);

  await createEventMetadata(id, newEvent);
}

async function createMultiEvent(newEvent: CreateEventWizardSchema, user: User) {
  const { id } = await useDrizzle()
    .insert(tables.events)
    .values(eventWizardItemToEvent(newEvent, user))
    .returning({ id: tables.events.id })
    .get();

  await createEventMetadata(id, newEvent);

  const others: EventInsert[] = newEvent.dates
    .map(d => ({
      ...eventWizardItemToEvent(newEvent, user),
      parent: id,
      startDate: d.startDate,
      endDate: d.endDate
    }));

  await useDrizzle().insert(tables.events)
    .values(others);
}

async function createEventMetadata(id: string, newEvent: CreateEventWizardSchema) {
  if (newEvent.allowedRoles?.length) {
    await useDrizzle()
      .insert(tables.eventAllowedRoles)
      .values(newEvent.allowedRoles.map((roleId: string) => ({
        event: id,
        role: roleId
      })));
  }

  if (newEvent.prices && Object.keys(newEvent.prices).length) {
    const prices = Object.entries(newEvent.prices)
      .map(([role, price]) => ({
        event: id,
        role,
        price
      }));

    await useDrizzle()
      .insert(tables.eventPrices)
      .values(prices);
  }
}

function eventWizardItemToEvent(newEvent: CreateEventWizardSchema, user: User): EventInsert {
  const { allowedRoles, prices, dates, ...rest } = newEvent;

  const result: EventInsert = {
    ...rest,
    status: "published", // TODO: set status based on role
    createdBy: user.id
  };
  console.log("new event", result);
  return result;
}
