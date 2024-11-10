export default eventHandler(async (event) => {
  const session = await requireUserSession(event);

  const user = await getUser(session.user.id);

  if (!user) {
    return createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }

  return user;
});
