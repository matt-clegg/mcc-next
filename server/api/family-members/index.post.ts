import { createFamilyMember } from "#shared/utils/abilities/family-members";

export default eventHandler(async (event) => {
  await requireUserSession(event);
  await authorize(event, createFamilyMember);
});
