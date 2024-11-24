import type { User } from "#auth-utils";

export const canBookOntoEvent = defineAbility((_: User) => {
  // A logged in user can book onto an event
  return true;
});
