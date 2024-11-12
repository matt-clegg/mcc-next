export default defineNitroPlugin(() => {
  sessionHooks.hook("fetch", async (session) => {
    if (session.user) {
      session.user = await getUser(session.user.id);
      if (session.user) {
        session.user.lastAccess = null;
      }
    }
  });
});
