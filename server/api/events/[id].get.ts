import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  try {
    const eventItem = await useDrizzle()
      .query
      .events
      .findFirst({
        where: eq(tables.users.id, id),
        with: {
          allowedRoles: {
            columns: {
              event: false
            },
            with: {
              role: {
                columns: {
                  name: true,
                  alias: true
                }
              }
            }
          },
          type: {
            columns: {
              id: true,
              name: true,
              color: true
            }
          },
          prices: {
            columns: {
              id: true,
              price: true,
              role: true
            }
          },
          bookings: true,
          createdBy: {
            columns: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      });

    console.log("id", id, eventItem);

    if (!eventItem) {
      throw createError({
        statusCode: 404,
        statusMessage: "Event not found"
      });
    }

    // if (eventItem.status === "draft") {
    //   const session = await getUserSession(event);
    //   if (!session.user) {
    //     throw createError({
    //       statusCode: 404,
    //       statusMessage: "Event not found"
    //     });
    //   }
    //
    //   if (await denies(event, canUserSeeDraftEvent, eventItem)) {
    //     throw createError({
    //       statusCode: 404,
    //       statusMessage: "Event not found"
    //     });
    //   }
    // }

    return eventItem;
  }
  catch (err: any) {
    console.error("errrr", err);
    throw err;
  }
});
