export type EventStatus = "draft" | "published" | "cancelled";
export type EventOccurrenceType = "single" | "multi" | "recurring";

export type EventItem = {
  id: string;

  status: EventStatus;
  title: string;
  description: string;
  location?: string;
  type: string;
  occurrenceType: EventOccurrenceType;
  maxSpaces?: number;

  attendeesVisible: boolean;
  allowBookingsAfterStart: boolean;
  lastBookingDate?: Date;
  minAge?: number;

  startDate: Date;
  endDate?: Date;
  rrule?: string;

  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
};

export type EventPrice = {
  id: string;
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
  createdBy: User;
};
