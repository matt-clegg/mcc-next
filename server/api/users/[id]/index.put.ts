export default eventHandler(async (event) => {
  // update a user
  const id = getRouterParam(event, "id")!;

  // TODO: Validate the user schema
  const body = await readBody(event);

  await requireUserSession(event);
  await authorize(event, editUser, id);

  return await updateUser(id, body);
});
