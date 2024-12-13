import type { EventOccurrenceType } from "#shared/types/events";

export type EventWizardItem = {
  title?: string;
  description?: string;
  location?: string;
  type?: string;
  occurrenceType?: EventOccurrenceType;
  maxSpaces?: number;

  allowedRoles: string[];
  prices: Record<string, number>;

  bookingAllowed: boolean;
  attendeesVisible: boolean;
  allowBookingsAfterStart: boolean;
  lastBookingDate?: Date;
  minAge?: number;

  startDate?: Date;
  endDate?: Date;
  dates?: {
    startDate: Date;
    endDate: Date;
  }[];
  rrule?: string;
};

export function useEventWizard(eventId?: string) {
  const newEvent = ref<EventWizardItem>(initialEventItem());

  if (eventId) {
    // TODO: Load existing event
  }

  function initialEventItem(): EventWizardItem {
    return {
      title: "Example Event",
      location: "Maidstone Canoe Club",
      description: "<p>Words about the <strong>event</strong> can go here.</p>",
      type: "g6lv590boEljAuEVEfNSg",

      allowedRoles: [],
      prices: {},
      dates: [],

      bookingAllowed: true,
      attendeesVisible: false,
      allowBookingsAfterStart: false
    };
  }

  return {
    newEvent
  };
}
