export default eventHandler(async (event) => {
  await requireUserSession(event);
  await authorize(event, createFamilyMember);
});
