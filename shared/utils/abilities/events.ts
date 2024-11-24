import type { SessionUser } from "#auth-utils";

export const canBookOntoEvent = defineAbility((_: SessionUser) => {
  // A logged in user can book onto an event
  return true;
});
