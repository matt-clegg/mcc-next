export const canBookOntoEvent = defineAbility((_: User) => {
  // A logged-in user can book onto an event
  return true;
});

export const canUserSeeDraftEvent = defineAbility((loggedInUser: User, eventItem: EventItem) => {
  if (loggedInUser.isAdmin) {
    return true;
  }

  if (eventItem.createdBy.id === loggedInUser.id) {
    return true;
  }

  // TODO: if user can review events

  return false;
});
