import { z } from "zod";
import { eq } from "drizzle-orm";
import { getEventBookings } from "~~/server/utils/events";
import { listUsers } from "~~/server/utils/user";

export default eventHandler(async (e) => {
  const { user } = await requireUserSession(e);
  const eventId = getRouterParam(e, "id")!;

  const body = await readValidatedBody(e, z.object({
    instance: z.coerce.number().optional(),
    userIds: z.array(z.string()).nonempty()
  }).parse);

  await authorize(e, canBookOntoEvent);

  const event = await getEvent(eventId, body.instance);

  if (!event) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event not found"
    });
  }

  // const bookings = await getEventBookings(eventId, body.instance);

  const currentBookingsCount = bookings.filter(b => b.status !== "cancelled").length;
  const maxBookings = event.maxSpaces;
  const usersToBook = body.userIds.length;

  if (maxBookings && currentBookingsCount + usersToBook > maxBookings) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event is full"
    });
  }

  /**
   * For each user to book in body.users
   * Check if the user is already booked
   * If user is already booked, that user cannot book again, add to booking results list
   * If the user had a booking, but it was cancelled
   * If the event requires payment, check if user has already paid for event
   */

  type BookingResult = {
    result: boolean;
    message?: string;
    booking?: string;
    user?: string;
  };

  const bookingResults: BookingResult[] = [];

  const users = await listUsers(body.userIds);
  const eventPrices = await getEventPrices(eventId);

  for (const user of users) {
    const previousBooking = bookings.find(b => b.user === user.id && b.status !== "cancelled");

    if (previousBooking) {
      bookingResults.push({
        result: false,
        message: "That user is already booked",
        user: user.id
      });
      continue;
    }

    const cancelledBooking = bookings.find(b => b.user === user.id && b.status === "cancelled");
    if (cancelledBooking) {
      const newStatus = "booked";

      // if event requires payment for the user role
      if (eventPrices.length) {
        const price = getPriceForUser(user, eventPrices);
        if (!price) {
          // no price found for user???
          continue;
        }
      }

      await useDrizzle()
        .update(tables.eventBookings)
        .set({
          status: newStatus
        })
        .where(eq(tables.eventBookings.id, cancelledBooking.id));

      bookingResults.push({
        result: true,
        message: "User was previously booked, but has been re-booked",
        booking: cancelledBooking.id,
        user: user.id
      });
    }
    else {
      const booking = await createEventBooking(eventId, user.id, "booked", body.instance);

      bookingResults.push({
        result: true,
        booking: booking.id,
        user: user.id
      });
    }
  }

  return bookingResults;
});
