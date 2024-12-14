export type EventStatus = "draft" | "published" | "cancelled";
export type EventOccurrenceType = "single" | "multi" | "recurring";

export type EventItem = {
  id: string;

  status: EventStatus;
  title: string;
  description: string;
  location: string | null;
  occurrenceType: EventOccurrenceType;
  maxSpaces: number | null;

  // Relations
  allowedRoles: { role: Partial<Role> }[] | null;
  type: Partial<EventType>;
  prices: Partial<EventPrice>[];
  bookings: Partial<EventBooking>[];

  bookingAllowed: boolean;
  attendeesVisible: boolean;
  allowBookingsAfterStart: boolean;
  lastBookingDate: Date | null;
  minAge: number | null;

  startDate: Date;
  endDate: Date;
  rrule: string | null;

  createdBy: Partial<User>;
  createdAt: string; // TODO: switch to Date
  updatedAt: string; // TODO: switch to Date
};

export type EventPrice = {
  id: string;
  price: number;
  role: string | null;
};

export type EventBooking = {
  id: string;
};

export type EventType = {
  id: string;
  name: string;
  alias: string;
  color: string;
  createdAt: Date;
  createdBy: Partial<User>;
};
